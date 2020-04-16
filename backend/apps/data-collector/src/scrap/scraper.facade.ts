import { BrowserService } from './browser.service';
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario';
import { SearchPlaceScraper } from './search-place.scraper';
import { AppConfigService } from '../config/app-config.service';
import { LaunchOptions } from 'puppeteer';
import { HotelsScraper } from './hotels.scraper';
import { ResultPageUrlBuilder } from './result-page-url.builder';

export class ScraperFacade {

  private readonly BASE_URL = 'https://www.booking.com';
  private readonly HOMEPAGE_WITH_DEFAULT_CURRENCY_AND_LANGUAGE: string = `${this.BASE_URL}/index.en-gb.html?selected_currency=PLN`;
  private readonly DEFAULT_RESOLUTION = {
    width: 1600,
    height: 900,
  };

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly browserService: BrowserService,
    private readonly hotelsScraper: HotelsScraper,
    private readonly resultPageUrlBuilder: ResultPageUrlBuilder,
    private readonly searchPlaceScraper: SearchPlaceScraper,
  ) {
  }

  public async initializeBrowser(launchOptions: LaunchOptions): Promise<void> {
    console.debug(`Initializing browser with options: ${JSON.stringify(launchOptions)}`);
    await this.browserService.initBrowserAndOpenBlankPage(launchOptions);

    console.debug(`Set page size [width: ${JSON.stringify(this.DEFAULT_RESOLUTION)}]`);
    await this.browserService.setPageSize(this.DEFAULT_RESOLUTION);
  }

  public async prepareResultList(searchPlaceIdentifier: string, collectHotelsScenario: CollectHotelsScenario): Promise<number> {
    console.debug(`Building result page uri based on search place identifier [${searchPlaceIdentifier}]`);
    const resultPageUri = this.resultPageUrlBuilder.fromSearchPlaceIdentifierAndScenarioParams(searchPlaceIdentifier, collectHotelsScenario);

    console.debug(`Preparing result list.`);
    return await this.hotelsScraper.prepareResultList(resultPageUri);
  }

  public async collectSearchPlaceIdentifier(searchPlace: string): Promise<string> {
    console.debug(`Starting search place identifier collecting.`);
    return this.searchPlaceScraper.collectSearchPlaceIdentifier(this.HOMEPAGE_WITH_DEFAULT_CURRENCY_AND_LANGUAGE, searchPlace);
  }

  public async collectHotelsFromCurrentPage() {
    return this.hotelsScraper.collectHotelsFromCurrentPage();
  }

  public async takeScreenshot(resultFolderPath: string) {
    return this.browserService.takeScreenshot(resultFolderPath);
  }

  public async performCleaningAfterScraping(): Promise<void> {
    const pagesBefore = await this.browserService.pagesCount() || [];
    console.debug('Closing browser. Open pages: ', pagesBefore.map((p) => ({ url: p.url() })));
    await this.browserService.closeBrowser();
    const pagesAfter = await this.browserService.pagesCount() || [];
    console.debug('Browser closed. Open pages: ', pagesAfter.map((p) => ({ url: p.url() })));
  }
}
