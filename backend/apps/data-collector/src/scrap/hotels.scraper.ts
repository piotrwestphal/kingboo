import { BrowserService } from './browser.service';
import { ResultPage } from './page/result/result.page';
import { ResultListPage } from './page/results-list/result-list.page';
import { ScrapedRawHotel } from './interface/scraped-raw-hotel';
import { ResultPageElement } from './page/result/result-page.element';

export class HotelsScraper {

  private readonly BASE_URL: string = `https://www.booking.com`;

  constructor(
    private readonly browserService: BrowserService,
    private readonly resultListPage: ResultListPage,
    private readonly resultPage: ResultPage,
  ) {
  }

  async prepareResultList(resultPageUri: string): Promise<number> {
    const resultPageUrl = `${this.BASE_URL}${resultPageUri}`;
    console.debug(`Navigating to [${resultPageUrl}]`);
    await this.browserService.enableRequestInterception();
    await this.browserService.goToAddressAndProceedIfFail(resultPageUrl);

    console.debug('Request page loaded. Default filter "show only available properties" is set ' +
      'and list is sorted by "distance from center".');

    console.debug('Trying to handle security check if appears.');
    await this.resultPage.handleSecurityCheck();

    console.debug(`Extracting current search place name from header.`);
    const { full, short } = await this.resultPage.extractCurrentSearchPlaceNameFromHeader();
    console.debug(`Full text extracted from header: [${full}].`);
    console.info(`Performed search for place: [${short}]. Difference may occur due to wrong search request param, ` +
      `or place is not a city or not exist.`);

    const totalPagesCount = await this.resultListPage.getSearchResultListLastPageNumber();
    console.debug(`There are [${totalPagesCount}] pages of search results.`);

    return totalPagesCount;
  }

  async collectHotelsFromCurrentPage(): Promise<{
    scrapedRawHotels: ScrapedRawHotel[],
    nextPageButtonAvailable: boolean
  }> {
    const { addressContainerType, priceContainerType, hotels } = await this.resultListPage.collectHotelsFromSearchResultList();
    if (addressContainerType) {
      console.debug(`There were [${addressContainerType}] address containers`);
    } else {
      console.warn('Not found known address containers');
    }
    console.debug(`There were [${priceContainerType}] price containers`);

    await this.browserService.wait(1000);
    const nextPageButtonAvailable = await this.resultPage.clickNextPageButtonIfAvailable();
    if (nextPageButtonAvailable) {
      try {
        await this.browserService.waitForHidden(ResultPageElement.LOADER_WINDOW, 15000);
      } catch (err) {
        console.warn(`Error when wait for hide of [${ResultPageElement.LOADER_WINDOW.description}]. ` +
          `Trying to proceed with process.`);
      }
    }
    return {
      scrapedRawHotels: hotels,
      nextPageButtonAvailable,
    };
  }
}
