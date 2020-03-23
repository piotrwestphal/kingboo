import { Injectable } from '@nestjs/common';
import { BrowserService } from '../browser.service';
import { MainPage } from './MainPage';

@Injectable()
export class MainPageService {

    constructor(private readonly browserService: BrowserService) {
    }

    public async extractProcessedSearchPlaceNameFromInput(city: string): Promise<string> {
        await this.browserService.typeText(MainPage.DESTINATION_INPUT, city);
        await this.browserService.waitForVisible(MainPage.AUTOCOMPLETE_LIST_CONTAINER, 15000);
        await this.browserService.click(MainPage.FIRST_ELEMENT_ON_AUTOCOMPLETE_LIST);
        await this.browserService.waitForHidden(MainPage.AUTOCOMPLETE_LIST_CONTAINER, 15000);
        return await this.browserService.getValueFromInput(MainPage.DESTINATION_INPUT.selector);
    }
}
