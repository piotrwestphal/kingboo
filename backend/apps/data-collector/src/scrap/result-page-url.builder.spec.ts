import { ResultPageUrlBuilder } from './result-page-url.builder'

describe('ResultPageUrlBuilder', () => {

  let resultPageUrlBuilder: ResultPageUrlBuilder

  beforeEach(() => {
    resultPageUrlBuilder = new ResultPageUrlBuilder()
  })

  it('should build params properly [1]', () => {
    // when
    const result = resultPageUrlBuilder.fromSearchPlaceIdentifierAndScenarioParams(
      {
        destination: 'mock', destId: '123', destType: null, placeIdLon: null, placeIdLat: null
      },
      {
        checkInDate: {
          day: 1,
          month: 2,
          year: 2021,
        },
        checkOutDate: {
          day: 3,
          month: 4,
          year: 2022,
        },
        childrenAgeAtCheckout: [1,8],
        numberOfAdults: 3,
        numberOfRooms: 2
      },
      {sortByDistance: true, showOnlyAvailableProperties: true})

    // then
    expect(result).toBe('/searchresults.en-gb.html' +
      '?checkin_year=2021&checkin_month=2&checkin_monthday=1' +
      '&checkout_year=2022&checkout_month=4&checkout_monthday=3' +
      '&group_adults=3&no_rooms=2&group_children=2&age=1&age=8' +
      '&ss=mock&dest_id=123' +
      '&nflt=oos%3D1%3B&order=distance_from_search&selected_currency=PLN')
  })

  it('should build params properly [2]', () => {
    // when
    const result = resultPageUrlBuilder.fromSearchPlaceIdentifierAndScenarioParams(
      {
        destination: 'mock', destId: '123', destType: 'mock', placeIdLon: '123', placeIdLat: '456'
      },
      {
        checkInDate: {
          day: 1,
          month: 2,
          year: 2021,
        },
        checkOutDate: {
          day: 3,
          month: 4,
          year: 2022,
        },
        childrenAgeAtCheckout: [],
        numberOfAdults: 2,
        numberOfRooms: 1
      })

    // then
    expect(result).toBe('/searchresults.en-gb.html' +
      '?checkin_year=2021&checkin_month=2&checkin_monthday=1' +
      '&checkout_year=2022&checkout_month=4&checkout_monthday=3' +
      '&group_adults=2&no_rooms=1&group_children=0' +
      '&ss=mock&dest_id=123&dest_type=mock&place_id_lat=456&place_id_lon=123' +
      '&selected_currency=PLN')
  })
})
