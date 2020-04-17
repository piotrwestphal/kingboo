import { BrowserService } from '../../browser.service';
import { ScrapedRawHotel } from '../../interface/scraped-raw-hotel';
import { ScrapedRawRoom } from '../../interface/scraped-raw-room';

interface AddressContainerData {
  distanceFromCenter: string;
  districtName: string;
  coords: string;
  addressContainerType: string;
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
  // TODO: clean up with google cloud logs
  public collectHotelsFromSearchResultList(): Promise<ScrapedRawHotel[]> {
    return this.browserService.evaluate<ScrapedRawHotel[]>(() => {
      // helper functions
      const getFirstElementByClass = (element: Element, classNames: string): HTMLElement | null =>
        element ? element.getElementsByClassName(classNames)[0] as HTMLElement || null : null;
      const getTextFromHtmlElementIfDefined = (htmlElement: HTMLElement | null): string | null =>
        htmlElement ? htmlElement.innerText : null;
      const getTextFromElement = (element: Element, classNames: string): string | null =>
        getTextFromHtmlElementIfDefined(getFirstElementByClass(element, classNames));
      const getElementFromContainer =
        (container: Element, containerClassNames: string, elementClassNames: string): HTMLElement | null =>
          getFirstElementByClass(getFirstElementByClass(container, containerClassNames), elementClassNames);
      const getTextFromElementIfContainerExist =
        (container: Element, containerClassNames: string, elementClassNames: string): string | null =>
          getTextFromHtmlElementIfDefined(getElementFromContainer(container, containerClassNames, elementClassNames));

      const getPrice = (searchResultContainer: Element): { price: string, priceContainerType: string } => {

        const newPriceContainer = getFirstElementByClass(searchResultContainer, 'prco-wrapper');
        if (newPriceContainer) {
          const price = getTextFromElement(newPriceContainer, 'bui-price-display__value');
          return {
            price,
            priceContainerType: price ? `NEW` : `NEW (no price)`,
          };
        }

        // in case of the standard search criteria
        const priceWithTaxContainer = getFirstElementByClass(searchResultContainer, 'b_bigger_tag');
        if (priceWithTaxContainer) {
          const price = getTextFromElement(priceWithTaxContainer, 'price');
          return {
            price,
            priceContainerType: price ? 'OLD - standard' : 'OLD - standard (no price)',
          };
        }

        // in case when couple of rooms are taken into consideration
        const multipleRoomsPriceWithTaxContainer = getFirstElementByClass(searchResultContainer, 'totalPrice');
        if (multipleRoomsPriceWithTaxContainer) {
          const onlyPriceWithoutRoomDescription = getFirstElementByClass(multipleRoomsPriceWithTaxContainer, 'sr_gs_price_total');
          const price = onlyPriceWithoutRoomDescription
            ? getTextFromElement(multipleRoomsPriceWithTaxContainer, 'sr_gs_price_total')
            // in some cases price container has all info about prices as one string
            : multipleRoomsPriceWithTaxContainer.firstChild.nodeValue; // take everything from target element without children elements content
          return {
            price,
            priceContainerType: price ? 'OLD - multiple rooms' : 'OLD - multiple rooms (no price)',
          };
        }

        return {
          price: searchResultContainer.innerHTML.trim().replace(/\s/g, ' '),
          priceContainerType: 'UNKNOWN',
        };
      };

      // TODO: check if distance from center is extracted
      const extractFromAddressContainer = (searchResultContainer: Element): AddressContainerData => {
        const addressContainer = getFirstElementByClass(searchResultContainer, 'sr_card_address_line');
        if (addressContainer) {
          const districtLink = getFirstElementByClass(addressContainer, 'bui-link') as HTMLLinkElement;
          // distance from center span has no class and there are couple [3] spans without classes in address container
          // as well distance don't have unique attributes
          const spansWithoutClass = addressContainer.querySelectorAll<HTMLSpanElement>('span:not([class])');
          const textFromSpans = Array.from(spansWithoutClass).map(v => v.innerText);
          const concatText = textFromSpans.length ? textFromSpans.reduce((c, p) => c + p) : null;
          return {
            distanceFromCenter: concatText,
            districtName: districtLink.innerText,
            coords: districtLink.getAttribute('data-coords'),
            addressContainerType: 'NEW',
          };
        }
        const addressContainerOld = getFirstElementByClass(searchResultContainer, 'address');
        if (addressContainerOld) {
          const districtLink = getFirstElementByClass(addressContainerOld, 'district_link') as HTMLLinkElement;
          return {
            distanceFromCenter: getTextFromElement(searchResultContainer, 'distfromdest jq_tooltip'),
            districtName: districtLink.innerText,
            coords: districtLink.getAttribute('data-coords'),
            addressContainerType: 'OLD',
          };
        }
        return {
          distanceFromCenter: null,
          districtName: null,
          coords: null,
          addressContainerType: null,
        };
      };

      const getHotelLink = (searchResultContainer: Element) => {
        const linkElement = getFirstElementByClass(searchResultContainer, 'hotel_name_link') as HTMLLinkElement;
        return linkElement
          ? linkElement.href
          : null;
      };

      const hotels: ScrapedRawHotel[] = [];

      const searchResultsContainers = document.getElementsByClassName('sr_item sr_item_default');
      for (const searchResultContainer of searchResultsContainers) {
        // Sometimes other containers also appears like: Car Rental - they don't have name of hotel
        const name = getTextFromElement(searchResultContainer, 'sr-hotel__name');
        if (name) {
          const { coords, districtName, distanceFromCenter, addressContainerType }
            = extractFromAddressContainer(searchResultContainer);
          const hotelLink = getHotelLink(searchResultContainer);
          const rate = getTextFromElement(searchResultContainer, 'bui-review-score__badge');
          const secondaryRateType = getTextFromElementIfContainerExist(
            searchResultContainer, 'review-score-widget__14', 'review-score-widget__text');
          const secondaryRate = getTextFromElementIfContainerExist(searchResultContainer,
            'review-score-widget__14', 'review-score-badge');
          const numberOfReviews = getTextFromElement(searchResultContainer, 'bui-review-score__text');
          const propertyType = getTextFromElement(searchResultContainer, 'bh-property-type');
          const starRating = getTextFromElementIfContainerExist(searchResultContainer, 'bk-icon-stars', 'invisible_spoken');
          const hotelNewlyAdded = getTextFromElement(searchResultContainer, 'new_hotel__badge');

          // Price
          const { price, priceContainerType } = getPrice(searchResultContainer);
          const tax = getTextFromElement(searchResultContainer, 'prd-taxes-and-fees-under-price');

          // Bonuses
          const groupRoomsContainer = getFirstElementByClass(searchResultContainer, 'sr_gr sr-group_recommendation');
          const hotelBonuses: string[] = [];
          const rooms: ScrapedRawRoom[] = [];
          if (groupRoomsContainer) {
            // in case of the search request different than the standard search criteria
            const roomsContainers = searchResultContainer.getElementsByClassName('roomrow entire_row_clickable');
            for (const roomContainer of roomsContainers) {
              const containerWithBonuses = getFirstElementByClass(roomContainer, 'roomNameInner');
              const bonusesElements = containerWithBonuses.getElementsByTagName('sup');
              const bonuses = Array.from(bonusesElements).map(b => b.innerText);
              const descriptionShort = getTextFromElement(roomContainer, 'room_link');
              const descriptionLong = getTextFromElement(roomContainer, 'c-unit-configuration');
              const personCount = getTextFromElement(roomContainer, 'maxPersonsLeft');
              const beds = getTextFromElement(roomContainer, 'c-beds-configuration');
              rooms.push({
                description: `${descriptionShort}|${descriptionLong}`,
                personCount,
                beds,
                bonuses,
              });
            }
          } else {
            // in case of the standard search criteria
            const freeCancellation = getTextFromElement(searchResultContainer, 'free-cancel-persuasion');
            if (freeCancellation) {
              hotelBonuses.push(freeCancellation);
            }
            const hotelBonusesUnderPrice = searchResultContainer.getElementsByClassName('sr_room_reinforcement');
            for (const h of hotelBonusesUnderPrice) {
              const hotelBonus = getTextFromHtmlElementIfDefined(h as HTMLElement);
              hotelBonuses.push(hotelBonus);
            }
          }
          hotels.push({
            name,
            price,
            tax,
            distanceFromCenter,
            districtName,
            coords,
            hotelLink,
            rate,
            secondaryRateType,
            secondaryRate,
            numberOfReviews,
            propertyType,
            starRating,
            newlyAdded: hotelNewlyAdded,
            bonuses: hotelBonuses.length ? hotelBonuses : null,
            rooms: rooms.length ? rooms : null,
            debug: {
              addressContainerType,
              priceContainerType,
            }
          });
        }
      }
      return hotels;
    });
  }

  public async getSearchResultListLastPageNumber(): Promise<number> {
    const lastPageIndicator = await this.browserService.evaluate<string>(() => {
      const paginationPagesContainer = document.getElementsByClassName('bui-pagination__pages')[0];
      if (!paginationPagesContainer) {
        return 0;
      }
      const paginationPages = paginationPagesContainer.getElementsByClassName('sr_pagination_item');
      const lastPage = paginationPages.item(paginationPages.length - 1) as HTMLElement;
      return (lastPage.getElementsByClassName('bui-u-inline')[0] as HTMLElement).innerText;
    });
    return parseInt(lastPageIndicator, 10);
  }
}
