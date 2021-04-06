import { BrowserService } from './browser.service';
import { ResultPage } from './page/result/result.page';
import { ResultListPage } from './page/results-list/result-list.page';
import { ResultPageElement } from './page/result/result-page.element';
import { logger } from '../logger';
import { NextPageScrapResults } from './interface/next-page-scrap-results';

export class HotelsScraper {

  private readonly BASE_URL: string = `https://www.booking.com`;

  constructor(
    private readonly browserService: BrowserService,
    private readonly resultListPage: ResultListPage,
    private readonly resultPage: ResultPage,
  ) {
  }

  async prepareResultList(resultPageUri: string, enableStyles: boolean): Promise<number> {
    const resultPageUrl = `${this.BASE_URL}${resultPageUri}`;
    logger.debug(`Navigating to [${resultPageUrl}]`);
    if (!enableStyles) {
      await this.browserService.enableStylesRequestInterception();
    }
    await this.browserService.goToAddressAndProceedIfFail(resultPageUrl);
    logger.debug('Request page loaded. Default filter "show only available properties" is set ' +
      'and list is sorted by "distance from center".');

    logger.debug('Trying to handle security check if appears.');
    await this.resultPage.handleSecurityCheck();

    logger.debug(`Extracting current search place name from header.`);
    const { full, short } = await this.resultPage.extractCurrentSearchPlaceNameFromHeader();
    logger.debug(`Full text extracted from header: [${full}].`);
    logger.info(`Performed search for place: [${short}]. Difference may occur due to wrong search request param, ` +
      `or place is not a city or not exist.`);

    const totalPagesCount = await this.resultListPage.getSearchResultListLastPageNumber();
    logger.debug(`There are [${totalPagesCount}] pages of search results.`);

    return totalPagesCount;
  }

  async collectHotelsFromCurrentPage(): Promise<NextPageScrapResults> {
    const scrapedRawHotels = await this.resultListPage.collectHotelsFromSearchResultList();
    await this.browserService.wait(1000);
    const nextPageButtonAvailable = await this.resultPage.clickNextPageButtonIfAvailable();
    if (nextPageButtonAvailable) {
      try {
        await this.browserService.waitForHidden(ResultPageElement.LOADER_WINDOW, 15000);
      } catch (err) {
        logger.warn(`Error when wait for hide of [${ResultPageElement.LOADER_WINDOW.description}]. ` +
          `Trying to proceed with process.`);
      }
    }
    return {
      scrapedRawHotels,
      nextPageButtonAvailable,
    };
  }
}
