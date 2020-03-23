import { Injectable } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { ScrapHotelsScenarioService } from './scrap-hotels-scenario.service';
import { FileManagerService } from './file-manager.service';
import { SAVE_RESULTS_AS_JSON_AND_TAKE_SCREENSHOTS_ON_ERROR } from '../config';
import { SearchRequestDocument } from '../model/document/searchRequest.document';
import { ScrapingStatusDto } from '../model/interface/scrapingStatus.dto';
import { HotelRaw } from '../model/interface/hotel.raw';

@Injectable()
export class ScrapingRunnerService {

  constructor(
    private readonly browserService: BrowserService,
    private readonly fileManagerService: FileManagerService,
    private readonly scrapHotelsScenarioService: ScrapHotelsScenarioService,
  ) {
  }

  public async start(searchRequestDocument: SearchRequestDocument) {
    try {
      console.debug('Initialize browser and navigate to target page.');
      await this.browserService.initBrowserAndOpenBlankPage();
      console.info('Starting search process and then scraping.');
      const searchResult = await this.startScenario(searchRequestDocument);
      if (searchResult && SAVE_RESULTS_AS_JSON_AND_TAKE_SCREENSHOTS_ON_ERROR) {
        const pathToResult = await this.fileManagerService.saveHotelDataAsJSON(searchResult,
          `${searchRequestDocument.city}`);
        console.info(`HotelData was saved locally to: ${pathToResult}`);
      }
    } catch (e) {
      console.error('Error during running the scenario process.', e);
    } finally {
      const pagesBefore = await this.browserService.pagesCount() || [];
      console.debug('Closing browser. Open pages: ', pagesBefore.map((p) => ({ url: p.url() })));
      await this.browserService.closeBrowser();
      const pagesAfter = await this.browserService.pagesCount() || [];
      console.debug('Browser closed. Open pages: ', pagesAfter.map((p) => ({ url: p.url() })));
    }
  }

  private async startScenario(searchRequest: SearchRequestDocument):
    Promise<{ hotels: HotelRaw[], scrapingStatusDto: Omit<ScrapingStatusDto, 'timestamp'>, searchPerformedForPlace: string }> {
    try {
      return await this.scrapHotelsScenarioService.collectHotels(searchRequest);
    } catch (e) {
      console.error(`Error when collecting data from web page.`, e);
      if (SAVE_RESULTS_AS_JSON_AND_TAKE_SCREENSHOTS_ON_ERROR) {
        await this.browserService.takeScreenshot('error');
      }
      return e;
    }
  }
}
