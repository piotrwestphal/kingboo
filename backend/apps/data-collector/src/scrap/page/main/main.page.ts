import { BrowserService } from '../../browser.service'
import { MainPageElement } from './main-page.element'
import { SearchPlaceIdentifier } from '../../../core/interface/search-place-identifier'
import { logger } from '../../../logger'

export class MainPage {

  constructor(private readonly browserService: BrowserService) {
  }

  public async extractSearchPlaceIdentifierFromFormInputs(searchPlace: string): Promise<SearchPlaceIdentifier> {
    await this.browserService.wait(5000) // when typing text the input field losing focus and search place was cut off
    await this.browserService.typeText(MainPageElement.DESTINATION_INPUT, searchPlace)
    await this.browserService.waitForVisible(MainPageElement.AUTOCOMPLETE_LIST_CONTAINER, 15000)
    await this.browserService.click(MainPageElement.FIRST_ELEMENT_ON_AUTOCOMPLETE_LIST)
    await this.browserService.waitForHidden(MainPageElement.AUTOCOMPLETE_LIST_CONTAINER, 15000)

    const destination = await this.browserService.getValueFromInput(MainPageElement.DESTINATION_INPUT.selector)
    const destId = await this.browserService.getValueFromInput(MainPageElement.DEST_ID_INPUT.selector)
    const destType = await this.browserService.getValueFromInput(MainPageElement.DEST_TYPE_INPUT.selector)
    const placeIdLat = await this.browserService.getValueFromInput(MainPageElement.PLACE_ID_LAT_INPUT.selector).catch((e) => {
      logger.error(`Selector [${MainPageElement.PLACE_ID_LAT_INPUT.description}] not found but proceeding`, e)
      return ""
    })
    const placeIdLon = await this.browserService.getValueFromInput(MainPageElement.PLACE_ID_LON_INPUT.selector).catch((e) => {
      logger.error(`Selector [${MainPageElement.PLACE_ID_LON_INPUT.description}] not found but proceeding`, e)
      return ""
    })
    // DEBUG purposes
    await this.browserService.click(MainPageElement.SUBMIT_BUTTON)
    await this.browserService.wait(5000)
    return {
      destination,
      destId,
      destType,
      placeIdLat,
      placeIdLon,
    }
  }
}
