import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { DataToProcessSender } from '../core/abstract/data-to-process.sender'
import { TimeHelper } from '@kb/util'
import { ScraperFacade } from '../scrap/scraper.facade'
import { CollectingScenario } from '../core/interface/collecting-scenario'
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
    private readonly dataToProcessSender: DataToProcessSender,
    private readonly fileRepository: FileRepository,
    private readonly scraperFacade: ScraperFacade,
  ) {
  }

  async collectHotels(searchId: string,
                      collectHotelsScenario: CollectingScenario,
                      searchPlaceIdentifier: SearchPlaceIdentifier): Promise<number> {
    const startCollectingHotelsTimeMs = Date.now()
    const rawSearchResult = new RawSearchResult(searchId, searchPlaceIdentifier)
    const resultPageUri = this.scraperFacade.buildResultPageUri(
      searchPlaceIdentifier, collectHotelsScenario, { showOnlyAvailableProperties: true, sortByDistance: true })
    const enableStylesOnResultsPage = this.appConfigService.enableStylesOnResultsPage
    const totalPagesCount = await this.scraperFacade.prepareResultList(resultPageUri, enableStylesOnResultsPage)

    // TODO: remove if not needed
    if (!totalPagesCount) {
      logger.error(`Probably there is something wrong with result page view`) // TODO: remove if not needed
      const debugHtml = await this.scraperFacade.getInnerHtmlForDebugPurpose()
      await this.fileRepository.save(debugHtml, 'missing-values', 'debug-html', 'html')
    }

    const {
      pagesCollected,
      rawHotels
    } = await this.collectHotelAsLongAsConditionsMet(searchId, totalPagesCount, collectHotelsScenario.resultsLimit)
    rawSearchResult.addHotelsAfterCollectingFinish(rawHotels)

    const collectingTimeSec = TimeHelper.getDiffTimeInSeconds(startCollectingHotelsTimeMs)
    logger.info(`Collecting hotels last [${collectingTimeSec}] sec`)
    rawSearchResult.setCollectingTime(collectingTimeSec)

    logger.debug(`Saving raw search result with id [${rawSearchResult.searchId}] to db.`)
    await this.fileRepository.save(JSON.stringify(rawSearchResult), searchId, 'raw-search-result')
    return pagesCollected
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
      const hotelOrderIndex = (idx: number) => idx + currentHotelsCount
      const mappedRawHotels = scrapedRawHotels.map((h, idx) =>
        RawHotelMapper.fromScrapedRawHotel(h, hotelOrderIndex(idx), collectedAt))
      rawHotels.push(...mappedRawHotels)
      isNextPageButtonAvailable = nextPageButtonAvailable
      currentHotelsCount += scrapedRawHotels.length
      pagesCollected = ++pagesCollected
      const rawHotelDtos = mappedRawHotels.map(h => RawHotelMapper.toDto(h));
      this.dataToProcessSender.sendHotelsPart(searchId, rawHotelDtos)
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
}
