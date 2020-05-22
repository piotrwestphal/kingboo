import { Module } from '@nestjs/common';
import { ScraperFacade } from './scraper.facade';
import { BrowserService } from './browser.service';
import { ResultListPage } from './page/results-list/result-list.page';
import { ResultPage } from './page/result/result.page';
import { MainPage } from './page/main/main.page';
import { ResultPageUrlBuilder } from './result-page-url.builder';
import { HotelsScraper } from './hotels.scraper';
import { SearchPlaceScraper } from './search-place.scraper';

@Module({
  imports: [],
  providers: [
    {
      provide: ScraperFacade,
      useFactory: () => {
        const browserService = new BrowserService();
        const mainPage = new MainPage(browserService);
        const resultListPage = new ResultListPage(browserService);
        const resultPage = new ResultPage(browserService);
        const resultPageUrlBuilder = new ResultPageUrlBuilder();
        const hotelsScraper = new HotelsScraper(browserService, resultListPage, resultPage);
        const searchPlaceScraper = new SearchPlaceScraper(browserService, mainPage);
        return new ScraperFacade(
          browserService,
          hotelsScraper,
          resultPageUrlBuilder,
          searchPlaceScraper,
        );
      },
    },
  ],
  exports: [
    ScraperFacade,
  ],
})
export class ScrapModule {
}
