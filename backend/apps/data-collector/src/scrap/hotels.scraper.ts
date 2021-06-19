import { BrowserService } from './browser.service'
import { ResultPage } from './page/result/result.page'
import { ResultListPage } from './page/results-list/result-list.page'
import { ResultPageElement } from './page/result/result-page.element'
import { logger } from '../logger'
import { NextPageScrapResults } from './interface/next-page-scrap-results'
import { ScrapedRawHotel } from './interface/scraped-raw-hotel'

export class HotelsScraper {

  constructor(
    private readonly browserService: BrowserService,
    private readonly resultListPage: ResultListPage,
    private readonly resultPage: ResultPage,
  ) {
  }

  async collectHotelsFromCurrentPageAndGoToNextOne(): Promise<NextPageScrapResults> {
    const scrapedRawHotels = await this.resultListPage.collectHotelsFromSearchResultList()
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

  async collectHotelsFromCurrentPage(): Promise<ScrapedRawHotel> {
    const scrapedRawHotels = await this.resultListPage.collectHotelsFromSearchResultList()
    return scrapedRawHotels[0]
  }
}
