import { Hotel } from './Hotel';

describe('Hotel', () => {
  it('should update when price has not changed on new hotel', () => {
    // given
    const hotel = new Hotel(
      'mock',
      'mock',
      'mock',
      {
        lat: 0,
        lon: 0,
      },
      [{
        value: 100,
        changedAt: 'mock1',
        occurrenceCount: 1,
      }],
      ['mock1'],
      {
        price: 100,
        districtName: 'mock',
        distanceFromCenterMeters: 100,
        hotelLink: 'link',
        rate: 0,
        secondaryRate: 0,
        secondaryRateType: 'mock',
        numberOfReviews: 0,
        newlyAdded: false,
        starRating: 2,
        bonuses: null,
        rooms: [],
      },
      {
        avgPrice: 100,
        minPrice: 100,
        maxPrice: 100,
        avgPriceDiff: 0,
        maxPriceDiff: 0,
        priceRate: 0,
      },
      'mock1',
      1,
    )

    // when
    hotel.updateWhenPriceHasNotChanged(
      'mock2',
      {
        price: 150,
        districtName: 'mock',
        distanceFromCenterMeters: 100,
        hotelLink: 'link',
        rate: 0,
        secondaryRate: 0,
        secondaryRateType: 'mock',
        numberOfReviews: 0,
        newlyAdded: false,
        starRating: 2,
        bonuses: null,
        rooms: [],
      },
      {
        avgPrice: 100,
        minPrice: 100,
        maxPrice: 100,
        avgPriceDiff: 0,
        maxPriceDiff: 0,
        priceRate: 0,
      },
    )

    // then
    expect(hotel.priceChanges.length).toBe(1)
    expect(hotel.priceChanges[0].value).toBe(100)
    expect(hotel.priceChanges[0].occurrenceCount).toBe(2)
    expect(hotel.priceChanges[0].changedAt).toBe('mock1')
    expect(hotel.collectedAt.length).toBe(2)
    expect(hotel.collectedAt[0]).toBe('mock1')
    expect(hotel.collectedAt[1]).toBe('mock2')
    expect(hotel.lastCollectedAt).toBe('mock2')
    expect(hotel.collectingCount).toBe(2)
  })

  it('should update when price has not changed', () => {
    // given
    const hotel = new Hotel(
      'mock',
      'mock',
      'mock',
      {
        lat: 0,
        lon: 0,
      },
      [
        {
          value: 100,
          changedAt: 'mock1',
          occurrenceCount: 2,
        },
        {
          value: 200,
          changedAt: 'mock3',
          occurrenceCount: 1,
        },
        {
          value: 150,
          changedAt: 'mock4',
          occurrenceCount: 2,
        }
      ],
      ['mock1', 'mock2', 'mock3', 'mock4', 'mock5'],
      {
        price: 150,
        districtName: 'mock',
        distanceFromCenterMeters: 100,
        hotelLink: 'link',
        rate: 0,
        secondaryRate: 0,
        secondaryRateType: 'mock',
        numberOfReviews: 0,
        newlyAdded: false,
        starRating: 2,
        bonuses: null,
        rooms: [],
      },
      {
        avgPrice: 100,
        minPrice: 100,
        maxPrice: 100,
        avgPriceDiff: 100,
        maxPriceDiff: 100,
        priceRate: 100,
      },
      'mock5',
      5,
    )

    // when
    hotel.updateWhenPriceHasNotChanged(
      'mock6',
      {
        price: 150,
        districtName: 'mock',
        distanceFromCenterMeters: 100,
        hotelLink: 'link',
        rate: 0,
        secondaryRate: 0,
        secondaryRateType: 'mock',
        numberOfReviews: 0,
        newlyAdded: false,
        starRating: 3,
        bonuses: null,
        rooms: [],
      },
      {
        avgPrice: 100,
        minPrice: 100,
        maxPrice: 100,
        avgPriceDiff: 100,
        maxPriceDiff: 100,
        priceRate: 100,
      },
    )

    // then
    expect(hotel.priceChanges.length).toBe(3)
    expect(hotel.priceChanges[2].value).toBe(150)
    expect(hotel.priceChanges[2].occurrenceCount).toBe(3)
    expect(hotel.priceChanges[2].changedAt).toBe('mock4')
    expect(hotel.collectedAt.length).toBe(6)
    expect(hotel.collectedAt[5]).toBe('mock6')
    expect(hotel.lastCollectedAt).toBe('mock6')
    expect(hotel.collectingCount).toBe(6)
    expect(hotel.latestValues.starRating).toBe(3)
  })
})