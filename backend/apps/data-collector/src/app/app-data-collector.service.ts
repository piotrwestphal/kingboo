import { DataCollectorService } from '../core/abstract/data-collector.service';
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario';
import { RawSearchResult } from '../core/model/RawSearchResult';
import { ScraperFacade } from '../scrap/scraper.facade';
import { AppConfigService } from '../config/app-config.service';
import { FileManagerService } from './file-manager.service';
import { TimeHelper } from '../utils/TimeHelper';
import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender';
import { DataToProcessSender } from '../core/abstract/data-to-process.sender';
import { Injectable } from '@nestjs/common';
import { RawHotel } from '../core/model/RawHotel';
import { RawHotelMapper } from './mapper/raw-hotel.mapper';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';

@Injectable()
export class AppDataCollectorService extends DataCollectorService {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly dataCollectionNotificationSender: DataCollectionNotificationSender,
    private readonly dataToProcessSender: DataToProcessSender,
    private readonly fileManagerService: FileManagerService,
    private readonly rawSearchResultRepository: RawSearchResultRepository,
    private readonly scraperFacade: ScraperFacade,
  ) {
    super();
  }

  async collectData(collectHotelsScenario: CollectHotelsScenario): Promise<void> {
    console.info('Start collecting data for scenario: ', JSON.stringify(collectHotelsScenario));
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
      console.error('Error during collecting data.', err.message);
      if (this.appConfigService.takeScreenshotOnError) {
        await this.scraperFacade.takeScreenshot(this.fileManagerService.resultsFolderPath);
      }
    } finally {
      await this.scraperFacade.performCleaningAfterScraping();
    }
    const collectingTimeSec = TimeHelper.getDiffTimeInSeconds(startCollectingHotelsTimeMs);
    console.info(`Collecting data finish. Collecting last [${collectingTimeSec}] sec`);
    rawSearchResult.setCollectingTime(collectingTimeSec);

    console.debug(`Saving raw search result with id [${rawSearchResult.searchId}] to db,`);
    await this.rawSearchResultRepository.create(rawSearchResult);
    this.dataCollectionNotificationSender.sendHotelsCollectionCompleted(searchId, collectingTimeSec);

    if (this.appConfigService.saveRawResultInJson) {
      const pathToResult = await this.fileManagerService.saveDataAsJSON(rawSearchResult,
        `${collectHotelsScenario.searchPlace}_${collectHotelsScenario.searchId}`);
      console.debug(`Raw search result was saved locally to [${pathToResult}]`);
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
      const mappedRawHotels = scrapedRawHotels.map(h => RawHotelMapper.fromScrapedRawHotel(h));
      rawHotels.push(...mappedRawHotels);
      isNextPageButtonAvailable = nextPageButtonAvailable;
      currentHotelsCount += scrapedRawHotels.length;
      this.dataToProcessSender.sendHotels(searchId, mappedRawHotels);
    }
    if (isNextPageButtonAvailable) {
      console.debug('Stop hotels scraping - results limit has reached.');
    } else {
      console.debug('Stop hotels scraping - there is no more pages.');
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
