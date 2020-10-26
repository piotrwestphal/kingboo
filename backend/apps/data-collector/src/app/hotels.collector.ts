import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender';
import { DataToProcessSender } from '../core/abstract/data-to-process.sender';
import { FileManager, TimeHelper } from '@kb/util';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { ScraperFacade } from '../scrap/scraper.facade';
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario';
import { logger } from '../logger';
import { RawSearchResult } from '../core/model/RawSearchResult';
import { RawHotel } from '../core/model/RawHotel';
import { RawHotelMapper } from './mapper/raw-hotel.mapper';

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
    private readonly fileManagerService: FileManager,
    private readonly rawSearchResultRepository: RawSearchResultRepository,
    private readonly scraperFacade: ScraperFacade,
  ) {
  }

  async collectHotels(searchId: string, collectHotelsScenario: CollectHotelsScenario): Promise<number> {
    logger.info('Start collecting data for scenario: ', collectHotelsScenario);
    const startCollectingHotelsTimeMs = Date.now();
    let rawSearchResult: RawSearchResult = null;
    let expectedNumberOfParts = 0;
    try {
      await this.scraperFacade.initializeBrowser(this.appConfigService.puppeteerLaunchOptions);
      const searchPlaceIdentifier = await this.collectSearchPlaceIdentifierIfNotPresentAndNotify(searchId, collectHotelsScenario);
      rawSearchResult = new RawSearchResult(searchId, searchPlaceIdentifier);
      const enableStylesOnResultsPage = this.appConfigService.enableStylesOnResultsPage;
      const totalPagesCount = await this.scraperFacade.prepareResultList(searchPlaceIdentifier, collectHotelsScenario, enableStylesOnResultsPage);
      const { pagesCollected, rawHotels } = await this.collectHotelAsLongAsConditionsMet(searchId, totalPagesCount, collectHotelsScenario.resultsLimit);
      expectedNumberOfParts = pagesCollected
      rawSearchResult.addHotelsAfterCollectingFinish(rawHotels);
    } catch (err) {
      logger.error('Error during collecting data.', err.message);
      if (this.appConfigService.takeScreenshotOnError) {
        await this.scraperFacade.takeScreenshot('error', this.fileManagerService.resultsFolderPath);
      }
    } finally {
      await this.scraperFacade.performCleaningAfterScraping();
    }

    const collectingTimeSec = TimeHelper.getDiffTimeInSeconds(startCollectingHotelsTimeMs);
    logger.info(`Collecting hotels last [${collectingTimeSec}] sec`);

    if (rawSearchResult) {
      rawSearchResult.setCollectingTime(collectingTimeSec);
      logger.debug(`Saving raw search result with id [${rawSearchResult.searchId}] to db.`);
      await this.rawSearchResultRepository.create(rawSearchResult);
    } else {
      logger.warn('Raw search result was not saved to db due to incomplete data. Raw search result: ', rawSearchResult)
    }

    if (this.appConfigService.saveRawResultAsJson) {
      const pathToResult = await this.fileManagerService.saveDataAsJSON(rawSearchResult,
        `COLLECTED-${searchId}`);
      logger.debug(`Collected data was saved locally to [${pathToResult}]`);
    }

    return expectedNumberOfParts
  }

  private async collectHotelAsLongAsConditionsMet(searchId: string,
                                                  totalPagesCount: number,
                                                  resultsLimit: number): Promise<HotelCollectionResult> {
    const rawHotels = [];
    let currentHotelsCount = 0;
    let isNextPageButtonAvailable = totalPagesCount > 0;
    let pagesCollected = 0;
    while (isNextPageButtonAvailable && resultsLimit > currentHotelsCount) {
      // TODO: wrap with try catch
      const { scrapedRawHotels, nextPageButtonAvailable } = await this.scraperFacade.collectHotelsFromCurrentPage();
      const collectedAt = new Date().toISOString();
      const mappedRawHotels = scrapedRawHotels.map(h => RawHotelMapper.fromScrapedRawHotel(h, collectedAt));
      rawHotels.push(...mappedRawHotels);
      isNextPageButtonAvailable = nextPageButtonAvailable;
      currentHotelsCount += scrapedRawHotels.length;
      pagesCollected = ++pagesCollected
      this.dataToProcessSender.sendHotelsPart(searchId, mappedRawHotels);
    }
    if (isNextPageButtonAvailable) {
      logger.debug('Stop hotels scraping - results limit has reached.');
    } else {
      logger.debug('Stop hotels scraping - there is no more pages.');
    }
    return {
      rawHotels,
      pagesCollected,
    };
  }

  private async collectSearchPlaceIdentifierIfNotPresentAndNotify(searchId: string,
                                                                  {
                                                                    searchPlace,
                                                                    searchPlaceIdentifier,
                                                                  }: CollectHotelsScenario): Promise<string> {
    if (searchPlaceIdentifier) {
      return searchPlaceIdentifier;
    }
    const collectedSearchPlaceIdentifier = await this.scraperFacade.collectSearchPlaceIdentifier(searchPlace);
    this.dataCollectionNotificationSender.sendSearchPlaceIdentifier(searchId, collectedSearchPlaceIdentifier);
    return collectedSearchPlaceIdentifier;
  }
}
