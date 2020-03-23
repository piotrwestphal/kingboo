import { Injectable } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { FileManagerService } from './file-manager.service';
import { MainPageService } from './main-page/main-page.service';
import { SearchResultPageService } from './search-result-page/search-result-page.service';
import { HotelsCollectorService } from './search-result-page/hotels-collector.service';
import { SearchResultPage } from './search-result-page/SearchResultPage';
import { TimeHelper } from '../utils/TimeHelper';
import { SearchResultsPageUrlBuilder } from './search-result-page/SearchResultsPageUrlBuilder';
import { SearchRequestDocument } from '../model/document/searchRequest.document';
import { HotelRaw } from '../model/interface/hotel.raw';
import { ScrapingStatusDto } from '../model/interface/scrapingStatus.dto';

@Injectable()
export class ScrapHotelsScenarioService {

  private readonly BASE_URL = 'https://www.booking.com';
  private readonly HOMEPAGE_WITH_DEFAULT_CURRENCY_AND_LANGUAGE: string = `${this.BASE_URL}/index.en-gb.html?selected_currency=PLN`;

  constructor(private readonly browserService: BrowserService,
              private readonly coreService: FileManagerService,
              private readonly mainPageService: MainPageService,
              private readonly searchResultPageService: SearchResultPageService,
              private readonly searchResultListService: HotelsCollectorService) {
  }

  public async collectHotels(searchRequest: SearchRequestDocument):
    Promise<{ hotels: HotelRaw[], scrapingStatusDto: Omit<ScrapingStatusDto, 'timestamp'>, searchPerformedForPlace: string }> {
    try {
      await this.browserService.setPageSize({ width: 1600, height: 900 });
      await this.browserService.goToAddress(this.HOMEPAGE_WITH_DEFAULT_CURRENCY_AND_LANGUAGE);
    } catch (err) {
      await this.browserService.stopPageLoading();
      console.error(`Waiting for navigation after going to page [${this.HOMEPAGE_WITH_DEFAULT_CURRENCY_AND_LANGUAGE}]. ` +
        `Stop page loading. The browser might not display any content. Next steps could fail :(. ` +
        `Trying to proceed with process.`);
    }

    console.info('Extract processed search place name from input.');
    const processedSearchPlaceName = searchRequest.city; // await this.mainPageService.extractProcessedSearchPlaceNameFromInput(searchRequest.city);
    console.debug('Extracted processed search place name: ', processedSearchPlaceName);

    console.debug('Build search requests page uri based on processed search place name.');
    const searchRequestsPageUri = new SearchResultsPageUrlBuilder().fromSearchPlaceNameAndSearchRequest(
      processedSearchPlaceName, searchRequest);
    console.debug('Search requests page uri: ', searchRequestsPageUri);

    console.info('Proceed to search requests page.');
    await this.browserService.goToAddress(`${this.BASE_URL}${searchRequestsPageUri}`);
    console.debug('Search requests page loaded. Default filter "show only available properties" is set ' +
      'and list is sorted by "distance from center".');

    console.debug('Trying to handle security check if appears.');
    await this.searchResultPageService.handleSecurityCheck();

    const { full, short } = await this.searchResultPageService.extractSearchPlaceNameFromHeader();
    console.debug(`Full text extracted from header: [${full}].`);
    console.info(`Perform search for place: [${short}]. Difference may occur due to wrong search request param, ` +
      `or place is not a city or not exist.`);

    console.info('Starting hotels scraping.');

    const { hotels, nextPageButtonAvailable, scrapingStatusDto } =
      await this.scrapHotelsAsLongAsConditionsMetAndNotifyClient(searchRequest);
    if (nextPageButtonAvailable) {
      console.info('Stop hotels scraping - results limit has reached.');
    } else {
      console.info('Stop hotels scraping - there is no more pages.');
    }
    return { hotels, scrapingStatusDto, searchPerformedForPlace: short };
  }

  private async scrapHotelsAsLongAsConditionsMetAndNotifyClient(searchRequest: SearchRequestDocument):
    Promise<{ hotels: HotelRaw[], nextPageButtonAvailable: boolean, scrapingStatusDto: Omit<ScrapingStatusDto, 'timestamp'> }> {
    const hotels = [];
    const totalPagesCount = await this.searchResultListService.getSearchResultListLastPageNumber();
    console.debug(`There are [${totalPagesCount}] pages of search results`);
    let currentPageNumber = 1;
    let currentHotelsCount = 0;
    let nextPageButtonAvailable = totalPagesCount > 0;
    const startScrapingTimeMs = Date.now();
    while (nextPageButtonAvailable && searchRequest.resultsLimit > currentHotelsCount) {
      console.log('Scraping status: ', {
        scrapingTimeSeconds: TimeHelper.getDiffTimeInSeconds(startScrapingTimeMs),
        currentPageNumber,
        currentHotelsCount,
        totalPagesCount,
        scrapingCompleted: false,
        savedToDb: false,
        timestamp: Date.now(),
      });
      const { searchResult, addressContainerType, priceContainerType } =
        await this.searchResultListService.collectHotelsFromSearchResultList();
      if (addressContainerType) {
        console.debug(`There were [${addressContainerType}] address containers`);
      } else {
        console.warn('Not found known address containers');
      }
      console.debug(`There were [${priceContainerType}] price containers`);

      hotels.push(...searchResult);
      currentHotelsCount += searchResult.length;
      // This timeout is probably needed due the puppeteer fast clicking or maybe the page is loading js files too slow - I don't know
      await this.browserService.wait(1000);
      nextPageButtonAvailable = await this.searchResultPageService.clickNextPageButtonIfAvailable();
      if (nextPageButtonAvailable) {
        currentPageNumber++;
        try {
          await this.browserService.waitForHidden(SearchResultPage.LOADER_WINDOW, 15000);
        } catch (err) {
          console.warn(`Error when wait for hide of [${SearchResultPage.LOADER_WINDOW.description}]. ` +
            `Trying to proceed with process.`);
        }
      }
    }
    const finalScrapingTimeSeconds = TimeHelper.getDiffTimeInSeconds(startScrapingTimeMs);
    const scrapingStatusDto = {
      scrapingTimeSeconds: finalScrapingTimeSeconds,
      currentPageNumber,
      currentHotelsCount,
      totalPagesCount,
      scrapingCompleted: true,
      savedToDb: false,
      timestamp: Date.now(),
    } as ScrapingStatusDto;
    console.log('Final scraping status', scrapingStatusDto);
    return { hotels, nextPageButtonAvailable, scrapingStatusDto };
  }
}
