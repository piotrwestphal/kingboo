import { BrowserService } from '../../browser.service'
import { ScrapedRawHotel } from '../../interface/scraped-raw-hotel'
import { ScrapedRawRoom } from '../../interface/scraped-raw-room'

interface AddressContainerData {
  distanceFromCenter: string
  districtName: string
  coords: string
}

export class ResultListPage {

  constructor(private readonly browserService: BrowserService) {
  }

  /**
   * There are two cases of scraping:
   * 1.   When the search request is for only 2 persons without children and only 1 room.
   *      Positions of elements on page are slightly different than in second case.
   *      This case of search request is called: 'standard search criteria'. 'rooms' will not be collected.
   * 2.   When the search request is for 2 persons with child or more than 2 persons or more than 1 room. 'rooms' will be collected.
   */
  collectHotelsFromSearchResultList(): Promise<ScrapedRawHotel[]> {
    return this.browserService.evaluate<ScrapedRawHotel[]>(() => {
      // helper functions
      const getFirstElementByClass = (element: Element, classNames: string): HTMLElement | null =>
        element ? element.getElementsByClassName(classNames)[0] as HTMLElement || null : null
      const getTextFromHtmlElementIfDefined = (htmlElement: HTMLElement | null): string | null =>
        htmlElement ? htmlElement.innerText : null
      const getTextFromElement = (element: Element, classNames: string): string | null =>
        getTextFromHtmlElementIfDefined(getFirstElementByClass(element, classNames))
      const getElementFromContainer =
        (container: Element, containerClassNames: string, elementClassNames: string): HTMLElement | null =>
          getFirstElementByClass(getFirstElementByClass(container, containerClassNames), elementClassNames)
      const getTextFromElementIfContainerExist =
        (container: Element, containerClassNames: string, elementClassNames: string): string | null =>
          getTextFromHtmlElementIfDefined(getElementFromContainer(container, containerClassNames, elementClassNames))

      const getPrice = (searchResultContainer: Element): string => {
        const newPriceContainer = getFirstElementByClass(searchResultContainer, 'prco-wrapper')
        return getTextFromElement(newPriceContainer, 'bui-price-display__value')
      }

      const extractFromAddressContainer = (searchResultContainer: Element): AddressContainerData => {
        const addressContainer = getFirstElementByClass(searchResultContainer, 'sr_card_address_line')
        const districtLink = getFirstElementByClass(addressContainer, 'bui-link') as HTMLLinkElement
        // distance from center span has no class and there are couple [3] spans without classes in address container
        // as well distance don't have unique attributes
        const spansWithoutClass = addressContainer.querySelectorAll<HTMLSpanElement>('span:not([class])')
        const textFromSpans = Array.from(spansWithoutClass).map(v => v.innerText)
        const concatText = textFromSpans.length ? textFromSpans.reduce((c, p) => c + p) : null
        return {
          distanceFromCenter: concatText,
          districtName: districtLink.innerText,
          coords: districtLink.getAttribute('data-coords'),
        }
      }

      const extractStarsFromBadgesContainer = (searchResultContainer: Element): number => {
        // if following container exists it means that the item has stars rating - so the item is hotel
        const badgesContainer = getFirstElementByClass(searchResultContainer, 'c-accommodation-classification-rating__badge--stars')
        if (badgesContainer) {
          // get number of star icons
          const starIconElements = badgesContainer.getElementsByClassName('bui-rating__item')
          return starIconElements?.length
            ? starIconElements.length
            : null
        } else {
          return null
        }
      }

      const getHotelLink = (searchResultContainer: Element): string => {
        const linkElement = getFirstElementByClass(searchResultContainer, 'hotel_name_link') as HTMLLinkElement
        return linkElement
          ? linkElement.href
          : null
      }

      const getRoomShorDescription = (container: Element): string => {
        const elementWithSmallContent = container.querySelector('div.roomNameInner > div.room_link > span strong') as HTMLElement
        if (elementWithSmallContent) {
          return elementWithSmallContent.innerText
        }
        return (container.querySelector('div.roomNameInner > div.room_link > span') as HTMLElement).innerText
      }

      const searchResultsContainers = document.getElementsByClassName('sr_item sr_item_default')
      return Array.from(searchResultsContainers)
        .reduce((acc,
                 searchResultContainer) => {
          // Sometimes other containers also appears like: Car Rental - they don't have name of hotel
          const name = getTextFromElement(searchResultContainer, 'sr-hotel__name')
          if (name) {
            const { coords, districtName, distanceFromCenter } = extractFromAddressContainer(searchResultContainer)
            const hotelLink = getHotelLink(searchResultContainer)
            const rate = getTextFromElement(searchResultContainer, 'bui-review-score__badge')
            const secondaryRateType = getTextFromElementIfContainerExist(
              searchResultContainer, 'review-score-widget__14', 'review-score-widget__text')
            const secondaryRate = getTextFromElementIfContainerExist(searchResultContainer,
              'review-score-widget__14', 'review-score-badge')
            const numberOfReviews = getTextFromElement(searchResultContainer, 'bui-review-score__text')
            const starRating = extractStarsFromBadgesContainer(searchResultContainer)
            const hotelNewlyAdded = getTextFromElement(searchResultContainer, 'new_hotel__badge')

            // Price
            const price = getPrice(searchResultContainer)
            const tax = getTextFromElement(searchResultContainer, 'prd-taxes-and-fees-under-price')

            // bonuses & rooms
            const groupRoomsContainer = getFirstElementByClass(searchResultContainer, 'sr_gr sr-group_recommendation')
            const hotelBonuses: string[] = []
            const rooms: ScrapedRawRoom[] = []

            const room = groupRoomsContainer
              ? null
              : getRoomShorDescription(groupRoomsContainer)

            if (groupRoomsContainer) {
              // in case of the search request different than the standard search criteria
              const roomsContainers = searchResultContainer.getElementsByClassName('roomrow entire_row_clickable')
              for (const roomContainer of roomsContainers) {
                const containerWithBonuses = getFirstElementByClass(roomContainer, 'roomNameInner')
                const bonusesElements = containerWithBonuses.getElementsByTagName('sup')
                const bonuses = Array.from(bonusesElements).map(b => b.innerText)
                const shortDescription = getRoomShorDescription(roomContainer)
                const rawLongDescription = getTextFromElement(roomContainer, 'c-unit-configuration')
                const personCount = getTextFromElement(roomContainer, 'bui-u-sr-only')
                const beds = getTextFromElement(roomContainer, 'c-beds-configuration')
                rooms.push({
                  shortDescription,
                  longDescription: rawLongDescription !== '' ? rawLongDescription : null,
                  personCount,
                  beds,
                  bonuses,
                })
              }
            } else {
              // in case of the standard search criteria
              const freeCancellation = getTextFromElement(searchResultContainer, 'free-cancel-persuasion')
              if (freeCancellation) {
                hotelBonuses.push(freeCancellation)
              }
              const hotelBonusesUnderPrice = searchResultContainer.getElementsByClassName('sr_room_reinforcement')
              for (const h of hotelBonusesUnderPrice) {
                const hotelBonus = getTextFromHtmlElementIfDefined(h as HTMLElement)
                hotelBonuses.push(hotelBonus)
              }
            }
            acc.push({
              name,
              price,
              tax,
              distanceFromCenter,
              districtName,
              coords,
              hotelLink,
              roomName: rooms.length ? rooms.map(v => v.shortDescription).join(', ') : room,
              rate,
              secondaryRateType,
              secondaryRate,
              numberOfReviews,
              starRating,
              newlyAdded: hotelNewlyAdded,
              bonuses: hotelBonuses.length ? hotelBonuses : null,
              rooms: rooms.length ? rooms : null,
              debug: groupRoomsContainer.innerHTML,
            })
            return acc
          }
        }, [] as ScrapedRawHotel[])
    })
  }

  async getSearchResultListLastPageNumber(): Promise<number> {
    const lastPageIndicator = await this.browserService.evaluate<string>(() => {
      const paginationPagesContainer = document.getElementsByClassName('bui-pagination__pages')[0]
      if (!paginationPagesContainer) {
        return 0
      }
      const paginationPages = paginationPagesContainer.getElementsByClassName('sr_pagination_item')
      const lastPage = paginationPages.item(paginationPages.length - 1) as HTMLElement
      return (lastPage.getElementsByClassName('bui-u-inline')[0] as HTMLElement).innerText
    })
    return parseInt(lastPageIndicator, 10)
  }
}
