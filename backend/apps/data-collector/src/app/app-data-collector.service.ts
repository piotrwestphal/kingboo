import { DataCollectorService } from '../core/abstract/data-collector.service';
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario';
import { RawSearchResult } from '../core/model/RawSearchResult';
import { ScraperFacade } from '../scrap/scraper.facade';
import { AppConfigService } from '../config/app-config.service';
import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender';
import { DataToProcessSender } from '../core/abstract/data-to-process.sender';
import { Injectable } from '@nestjs/common';
import { RawHotel } from '../core/model/RawHotel';
import { RawHotelMapper } from './mapper/raw-hotel.mapper';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { FileManager, TimeHelper } from '@kb/util';
import { logger } from '../logger';

@Injectable()
export class AppDataCollectorService extends DataCollectorService {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly dataCollectionNotificationSender: DataCollectionNotificationSender,
    private readonly dataToProcessSender: DataToProcessSender,
    private readonly fileManagerService: FileManager,
    private readonly rawSearchResultRepository: RawSearchResultRepository,
    private readonly scraperFacade: ScraperFacade,
  ) {
    super();
  }

  async collectData(collectHotelsScenario: CollectHotelsScenario): Promise<void> {
    logger.info('Start collecting data for scenario: ', collectHotelsScenario);
    const startCollectingHotelsTimeMs = Date.now();

    const { searchId, resultsLimit } = collectHotelsScenario;
    const rawSearchResult = new RawSearchResult(searchId);
    try {
      await this.scraperFacade.initializeBrowser(this.appConfigService.puppeteerOptions);
      const searchPlaceIdentifier = await this.collectSearchPlaceIdentifierIfNotPresentAndNotify(collectHotelsScenario);
      rawSearchResult.setSearchPlaceIdentifier(searchPlaceIdentifier);
      const totalPagesCount = await this.scraperFacade.prepareResultList(searchPlaceIdentifier, collectHotelsScenario);
      const hotels = await this.collectHotelAsLongAsConditionsMet(searchId, totalPagesCount, resultsLimit);
      rawSearchResult.addHotelsAfterCollectingFinish(hotels);
    } catch (err) {
      logger.error('Error during collecting data.', err.message);
      if (this.appConfigService.takeScreenshotOnError) {
        await this.scraperFacade.takeScreenshot(this.fileManagerService.resultsFolderPath);
      }
    } finally {
      await this.scraperFacade.performCleaningAfterScraping();
    }
    const collectingTimeSec = TimeHelper.getDiffTimeInSeconds(startCollectingHotelsTimeMs);
    logger.info(`Collecting data finish. Collecting last [${collectingTimeSec}] sec`);
    rawSearchResult.setCollectingTime(collectingTimeSec);

    logger.debug(`Saving raw search result with id [${rawSearchResult.searchId}] to db.`);
    await this.rawSearchResultRepository.create(rawSearchResult);
    this.dataCollectionNotificationSender.sendHotelsCollectionCompleted(searchId, collectingTimeSec);

    if (this.appConfigService.saveRawResultInJson) {
      const pathToResult = await this.fileManagerService.saveDataAsJSON(rawSearchResult,
        `COLLECTED_DATA_${collectHotelsScenario.searchPlace}_${collectHotelsScenario.searchId}`);
      logger.debug(`Collected data was saved locally to [${pathToResult}]`);
    }
  }

  private async collectHotelAsLongAsConditionsMet(searchId: string,
                                                  totalPagesCount: number,
                                                  resultsLimit: number): Promise<RawHotel[]> {
    const rawHotels: RawHotel[] = [];
    let currentHotelsCount = 0;
    let isNextPageButtonAvailable = totalPagesCount > 0;
    while (isNextPageButtonAvailable && resultsLimit > currentHotelsCount) {
      const { scrapedRawHotels, nextPageButtonAvailable } = await this.scraperFacade.collectHotelsFromCurrentPage();
      const collectedAt = new Date().toISOString();
      const mappedRawHotels = scrapedRawHotels.map(h => RawHotelMapper.fromScrapedRawHotel(h, collectedAt));
      rawHotels.push(...mappedRawHotels);
      isNextPageButtonAvailable = nextPageButtonAvailable;
      currentHotelsCount += scrapedRawHotels.length;
      this.dataToProcessSender.sendHotels(searchId, mappedRawHotels);
    }
    if (isNextPageButtonAvailable) {
      logger.debug('Stop hotels scraping - results limit has reached.');
    } else {
      logger.debug('Stop hotels scraping - there is no more pages.');
    }
    return rawHotels;
  }

  private async collectSearchPlaceIdentifierIfNotPresentAndNotify({
                                                                    searchId,
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
