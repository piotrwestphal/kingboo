import { Module } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { MainPageService } from './main-page/main-page.service';
import { ScrapingRunnerService } from './scraping-runner.service';
import { FileManagerService } from './file-manager.service';
import { SearchResultPageService } from './search-result-page/search-result-page.service';
import { HotelsCollectorService } from './search-result-page/hotels-collector.service';
import { ScrapHotelsScenarioService } from './scrap-hotels-scenario.service';

@Module({
    providers: [
        BrowserService,
        FileManagerService,
        MainPageService,
        HotelsCollectorService,
        SearchResultPageService,
        ScrapingRunnerService,
        ScrapHotelsScenarioService,
    ],
    exports: [
        ScrapingRunnerService,
    ],
})
export class ScrapModule {
}
