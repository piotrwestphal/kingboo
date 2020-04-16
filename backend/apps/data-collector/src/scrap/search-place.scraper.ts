import { BrowserService } from './browser.service';
import { MainPage } from './page/main/main.page';

export class SearchPlaceScraper {

  constructor(
    private readonly browserService: BrowserService,
    private readonly mainPage: MainPage,
  ) {
  }

  async collectSearchPlaceIdentifier(baseUrl: string, searchPlace: string): Promise<string> {
    console.debug(`Navigating to [${baseUrl}]`);
    await this.browserService.goToAddressAndProceedIfFail(baseUrl);

    console.debug(`Extracting search place identifier from input for search place [${searchPlace}].`);
    const searchPlaceIdentifier = await this.mainPage.extractSearchPlaceIdentifierFromInput(searchPlace);

    console.debug(`Extracted search place identifier [${searchPlaceIdentifier}]`);
    return searchPlaceIdentifier;
  }
}
