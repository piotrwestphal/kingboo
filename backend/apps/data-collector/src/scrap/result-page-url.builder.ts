import { CheckDate } from '../core/interface/check-date'
import { SearchPlaceIdentifier } from '../core/interface/search-place-identifier'
import { ResultPageAdditionalParams } from './interface/result-page-additional-params'

interface ScenarioParams {
  readonly checkOutDate: CheckDate
  readonly checkInDate: CheckDate
  readonly numberOfAdults: number
  readonly numberOfRooms: number
  readonly childrenAgeAtCheckout: number[]
}

export class ResultPageUrlBuilder {

  private readonly SEARCH_RESULTS_PAGE = '/searchresults.en-gb.html'
  private readonly START_QUERY_MARK = '?'
  private readonly SEPARATE_PARAM_MARK = '&'

  private readonly CHECKIN_PREFIX_PARAM = 'checkin_'
  private readonly CHECKOUT_PREFIX_PARAM = 'checkout_'
  private readonly YEAR_SUFFIX_KEY = 'year='
  private readonly MONTH_SUFFIX_KEY = 'month='
  private readonly MONTHDAY_SUFFIX_KEY = 'monthday='

  private readonly NUMBER_OF_ADULTS_KEY = 'group_adults='
  private readonly NUMBER_OF_ROOMS_KEY = 'no_rooms='
  private readonly NUMBER_OF_CHILDREN_KEY = 'group_children='
  private readonly CHILDREN_AGE_KEY = 'age='

  private readonly DESTINATION_KEY = 'ss='
  private readonly DEST_ID_KEY = 'dest_id='
  private readonly DEST_TYPE_KEY = 'dest_type='
  private readonly PLACE_ID_LAT_KEY = 'place_id_lat='
  private readonly PLACE_ID_LON_KEY = 'place_id_lon='

  private readonly SELECTED_PLN_CURRENCY = 'selected_currency=PLN'
  private readonly SORT_BY_DISTANCE_PARAM = 'order=distance_from_search'
  private readonly SHOW_ONLY_AVAILABLE_PROPERTIES_FILTER_PARAM = 'nflt=oos%3D1%3B'

  fromSearchPlaceIdentifierAndScenarioParams({
                                               destination,
                                               destId,
                                               destType,
                                               placeIdLat,
                                               placeIdLon,
                                             }: SearchPlaceIdentifier,
                                             {
                                               checkOutDate,
                                               checkInDate,
                                               numberOfAdults,
                                               numberOfRooms,
                                               childrenAgeAtCheckout,
                                             }: ScenarioParams,
                                             resultPageAdditionalParams?: ResultPageAdditionalParams): string {
    const checkinDateParams = this.combineDate(this.CHECKIN_PREFIX_PARAM, checkInDate)
    const checkoutDateParams = this.combineDate(this.CHECKOUT_PREFIX_PARAM, checkOutDate)
    const numberOfAdultsParam = `${this.NUMBER_OF_ADULTS_KEY}${numberOfAdults}`
    const numberOfRoomsParam = `${this.NUMBER_OF_ROOMS_KEY}${numberOfRooms}`
    const numberOfChildrenParam = `${this.NUMBER_OF_CHILDREN_KEY}${childrenAgeAtCheckout.length}`
    const childrenAgeParams = childrenAgeAtCheckout.map(v => `${this.CHILDREN_AGE_KEY}${v}`)

    const searchPlaceIdentifierParams: string[] = []
    destination && searchPlaceIdentifierParams.push(`${this.DESTINATION_KEY}${encodeURIComponent(destination)}`)
    destId && searchPlaceIdentifierParams.push(`${this.DEST_ID_KEY}${destId}`)
    destType && searchPlaceIdentifierParams.push(`${this.DEST_TYPE_KEY}${destType}`)
    placeIdLat && searchPlaceIdentifierParams.push(`${this.PLACE_ID_LAT_KEY}${placeIdLat}`)
    placeIdLon && searchPlaceIdentifierParams.push(`${this.PLACE_ID_LON_KEY}${placeIdLon}`)

    const additionalParams: string[] = []
    resultPageAdditionalParams?.showOnlyAvailableProperties && additionalParams.push(this.SHOW_ONLY_AVAILABLE_PROPERTIES_FILTER_PARAM)
    resultPageAdditionalParams?.sortByDistance && additionalParams.push(this.SORT_BY_DISTANCE_PARAM)

    const queryParams: string = [
      ...checkinDateParams,
      ...checkoutDateParams,
      numberOfAdultsParam,
      numberOfRoomsParam,
      numberOfChildrenParam,
      ...childrenAgeParams,
      ...searchPlaceIdentifierParams,
      ...additionalParams,
      this.SELECTED_PLN_CURRENCY,
    ].reduce((p, c) => `${p}${this.SEPARATE_PARAM_MARK}${c}`)
    return `${this.SEARCH_RESULTS_PAGE}${this.START_QUERY_MARK}${queryParams}`
  }

  private combineDate = (prefix: string, { year, month, day }: CheckDate): string[] =>
    [
      `${this.YEAR_SUFFIX_KEY}${year}`,
      `${this.MONTH_SUFFIX_KEY}${month}`,
      `${this.MONTHDAY_SUFFIX_KEY}${day}`,
    ].map((v) => `${prefix}${v}`)
}
