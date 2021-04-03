import { BrowserService } from '../../browser.service';
import { MainPageElement } from './main-page.element';

export class MainPage {

  constructor(private readonly browserService: BrowserService) {
  }

  public async extractSearchPlaceIdentifierFromInput(searchPlace: string): Promise<string> {
    await this.browserService.wait(5000); // when typing text the input field losing focus and search place was cut off
    await this.browserService.typeText(MainPageElement.DESTINATION_INPUT, searchPlace);
    await this.browserService.waitForVisible(MainPageElement.AUTOCOMPLETE_LIST_CONTAINER, 15000);
    await this.browserService.click(MainPageElement.FIRST_ELEMENT_ON_AUTOCOMPLETE_LIST);
    await this.browserService.waitForHidden(MainPageElement.AUTOCOMPLETE_LIST_CONTAINER, 15000);
    return await this.browserService.getValueFromInput(MainPageElement.DESTINATION_INPUT.selector);
  }
}
