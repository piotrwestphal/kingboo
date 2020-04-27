import { BrowserService } from './browser.service';
import { MainPage } from './page/main/main.page';
import { logger } from '../logger';

export class SearchPlaceScraper {

  constructor(
    private readonly browserService: BrowserService,
    private readonly mainPage: MainPage,
  ) {
  }

  async collectSearchPlaceIdentifier(baseUrl: string, searchPlace: string): Promise<string> {
    logger.debug(`Navigating to [${baseUrl}]`);
    await this.browserService.goToAddressAndProceedIfFail(baseUrl);

    logger.debug(`Extracting search place identifier from input for search place [${searchPlace}].`);
    const searchPlaceIdentifier = await this.mainPage.extractSearchPlaceIdentifierFromInput(searchPlace);

    logger.debug(`Extracted search place identifier [${searchPlaceIdentifier}]`);
    return searchPlaceIdentifier;
  }
}
