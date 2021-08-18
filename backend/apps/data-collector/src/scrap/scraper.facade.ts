import { BrowserService } from './browser.service'
import { CollectingScenario } from '../core/interface/collecting-scenario'
import { SearchPlaceScraper } from './search-place.scraper'
import { HotelsScraper } from './hotels.scraper'
import { ResultPageUrlBuilder } from './result-page-url.builder'
import { logger } from '../logger'
import { NextPageScrapResults } from './interface/next-page-scrap-results'
import { PuppeteerLaunchOptions } from '../config/puppeteer/puppeteer-launch-options'
import { SearchPlaceIdentifier } from '../core/interface/search-place-identifier'
import { ResultListPreparer } from './result-list.preparer'
import { ResultPageAdditionalParams } from './interface/result-page-additional-params'
import { ScrapedRawHotel } from './interface/scraped-raw-hotel'

export class ScraperFacade {

  private readonly BASE_URL = 'https://www.booking.com'
  private readonly HOMEPAGE_WITH_DEFAULT_CURRENCY_AND_LANGUAGE = `${this.BASE_URL}/index.en-gb.html?selected_currency=PLN`
  private readonly DEFAULT_RESOLUTION = {
    width: 1600,
    height: 900,
  }

  constructor(
    private readonly browserService: BrowserService,
    private readonly hotelsScraper: HotelsScraper,
    private readonly resultListPreparer: ResultListPreparer,
    private readonly resultPageUrlBuilder: ResultPageUrlBuilder,
    private readonly searchPlaceScraper: SearchPlaceScraper,
  ) {
  }

  async initializeBrowser(launchOptions: PuppeteerLaunchOptions): Promise<void> {
    logger.debug(`Initializing browser with options`, launchOptions)
    await this.browserService.initBrowserAndOpenBlankPage(launchOptions)

    logger.debug(`Set page size`, this.DEFAULT_RESOLUTION)
    await this.browserService.setPageSize(this.DEFAULT_RESOLUTION)

    const userAgent = await this.browserService.getUserAgent()
    logger.debug(`Initializing browser. User agent: `, userAgent)
  }

  buildResultPageUri(searchPlaceIdentifier: SearchPlaceIdentifier,
                            collectingScenario: CollectingScenario,
                            resultPageAdditionalParams?: ResultPageAdditionalParams): string {
    logger.debug(`Building result page uri based on following values`, {searchPlaceIdentifier, collectingScenario, resultPageAdditionalParams})
    return this.resultPageUrlBuilder.fromSearchPlaceIdentifierAndScenarioParams(searchPlaceIdentifier, collectingScenario, resultPageAdditionalParams)
  }

  prepareResultList(resultPageUri: string, enableStyles: boolean): Promise<number> {
    logger.debug(`Preparing result list.`)
    return this.resultListPreparer.prepareResultList(resultPageUri, enableStyles)
  }

  collectSearchPlaceIdentifier(searchPlace: string): Promise<SearchPlaceIdentifier> {
    logger.debug(`Starting search place identifier collecting.`)
    return this.searchPlaceScraper.collectSearchPlaceIdentifier(this.HOMEPAGE_WITH_DEFAULT_CURRENCY_AND_LANGUAGE, searchPlace)
  }

  collectHotelsFromCurrentPage(): Promise<NextPageScrapResults> {
    return this.hotelsScraper.collectHotelsFromCurrentPageAndGoToNextOne()
  }

  collectFirstHotelFromCurrentPage(): Promise<ScrapedRawHotel> {
    return this.hotelsScraper.collectHotelsFromCurrentPage()
  }

  // TODO: remove if not needed
  getInnerHtmlForDebugPurpose(): Promise<string> {
    return this.browserService.evaluate(() => document.getElementById('right').innerHTML)
  }

  takeScreenshot(): Promise<string | Buffer | void> {
    return this.browserService.takeScreenshot()
  }

  async performCleaningAfterScraping(): Promise<void> {
    await this.browserService.closeBrowser()
  }
}
