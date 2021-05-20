import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender'
import { DataToProcessSender } from '../core/abstract/data-to-process.sender'
import { TimeHelper } from '@kb/util'
import { ScraperFacade } from '../scrap/scraper.facade'
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario'
import { logger } from '../logger'
import { RawSearchResult } from '../core/model/RawSearchResult'
import { RawHotel } from '../core/model/RawHotel'
import { RawHotelMapper } from './mapper/raw-hotel.mapper'
import { SearchPlaceIdentifier } from '../core/interface/search-place-identifier'
import { FileRepository } from '@kb/storage'

interface HotelCollectionResult {
  readonly pagesCollected: number
  readonly rawHotels: RawHotel[]
}

@Injectable()
export class HotelsCollector {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly dataCollectionNotificationSender: DataCollectionNotificationSender,
    private readonly dataToProcessSender: DataToProcessSender,
    private readonly fileRepository: FileRepository,
    private readonly scraperFacade: ScraperFacade,
  ) {
  }

  async collectHotels(searchId: string, collectHotelsScenario: CollectHotelsScenario): Promise<number> {
    logger.info('Start collecting data for scenario: ', collectHotelsScenario)
    const startCollectingHotelsTimeMs = Date.now()
    let rawSearchResult: RawSearchResult = null
    let expectedNumberOfParts = 0
    try {
      await this.scraperFacade.initializeBrowser(this.appConfigService.puppeteerLaunchOptions)
      const searchPlaceIdentifier = await this.collectSearchPlaceIdentifierIfNotPresentAndNotify(searchId, collectHotelsScenario)
      rawSearchResult = new RawSearchResult(searchId, searchPlaceIdentifier)
      const enableStylesOnResultsPage = this.appConfigService.enableStylesOnResultsPage
      const totalPagesCount = await this.scraperFacade.prepareResultList(searchPlaceIdentifier, collectHotelsScenario, enableStylesOnResultsPage)
      const {
        pagesCollected,
        rawHotels
      } = await this.collectHotelAsLongAsConditionsMet(searchId, totalPagesCount, collectHotelsScenario.resultsLimit)
      expectedNumberOfParts = pagesCollected
      rawSearchResult.addHotelsAfterCollectingFinish(rawHotels)
    } catch (err) {
      logger.error('Error during collecting data.', err.message)
      const image = await this.scraperFacade.takeScreenshot() as string
      await this.fileRepository.save(image, 'error-during-collecting-data', 'screenshot', 'png')
    } finally {
      await this.scraperFacade.performCleaningAfterScraping()
    }

    const collectingTimeSec = TimeHelper.getDiffTimeInSeconds(startCollectingHotelsTimeMs)
    logger.info(`Collecting hotels last [${collectingTimeSec}] sec`)

    if (rawSearchResult) {
      rawSearchResult.setCollectingTime(collectingTimeSec)
      logger.debug(`Saving raw search result with id [${rawSearchResult.searchId}] to db.`)
      await this.fileRepository.save(JSON.stringify(rawSearchResult), searchId, 'raw-search-result')
    } else {
      logger.warn('Raw search result was not saved to db due to incomplete data. Raw search result: ', rawSearchResult)
    }
    return expectedNumberOfParts
  }

  private async collectHotelAsLongAsConditionsMet(searchId: string,
                                                  totalPagesCount: number,
                                                  resultsLimit: number): Promise<HotelCollectionResult> {
    const rawHotels = []
    let currentHotelsCount = 0
    let isNextPageButtonAvailable = totalPagesCount > 0
    let pagesCollected = 0

    while (isNextPageButtonAvailable && resultsLimit > currentHotelsCount) {
      const { scrapedRawHotels, nextPageButtonAvailable } = await this.scraperFacade.collectHotelsFromCurrentPage()
      const collectedAt = new Date().toISOString()
      const hotelIdx = (idx: number) => idx + currentHotelsCount
      const mappedRawHotels = scrapedRawHotels.map((h, idx) => RawHotelMapper.fromScrapedRawHotel(h, hotelIdx(idx), collectedAt))
      rawHotels.push(...mappedRawHotels)
      isNextPageButtonAvailable = nextPageButtonAvailable
      currentHotelsCount += scrapedRawHotels.length
      pagesCollected = ++pagesCollected
      this.dataToProcessSender.sendHotelsPart(searchId, mappedRawHotels)
    }
    if (isNextPageButtonAvailable) {
      logger.debug('Stop hotels scraping - results limit has reached.')
    } else {
      logger.debug('Stop hotels scraping - there is no more pages.')
    }
    return {
      rawHotels,
      pagesCollected,
    }
  }

  private async collectSearchPlaceIdentifierIfNotPresentAndNotify(searchId: string,
                                                                  {
                                                                    searchPlace,
                                                                    searchPlaceIdentifier,
                                                                  }: CollectHotelsScenario): Promise<SearchPlaceIdentifier> {
    if (searchPlaceIdentifier) {
      return searchPlaceIdentifier
    }
    const collectedSearchPlaceIdentifier = await this.scraperFacade.collectSearchPlaceIdentifier(searchPlace)
    if (!collectedSearchPlaceIdentifier.destId) {
      const image = await this.scraperFacade.takeScreenshot() as string
      await this.fileRepository.save(image, 'missing-dest-id', 'screenshot', 'png')
    }
    this.dataCollectionNotificationSender.sendSearchPlaceIdentifier(searchId, collectedSearchPlaceIdentifier)
    return collectedSearchPlaceIdentifier
  }
}
