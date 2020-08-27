import { Hotel } from './hotel';

describe('Hotel', () => {
  it('should update when price has not changed on new hotel', () => {
    // given
    const hotel = new Hotel(
      'mock',
      'mock',
      'mock',
      0,
      'mock',
      {
        lat: 0,
        lon: 0,
      },
      'mock',
      'mock',
      1,
      ['mock1'],
      [{
        value: 100,
        changedAt: 'mock1',
        occurrenceCount: 1,
      }],
      {
        price: 100,
        rate: 0,
        secondaryRate: 0,
        secondaryRateType: 'mock',
        numberOfReviews: 0,
        newlyAdded: false,
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
      }
    )

    // when
    hotel.updateWhenPriceHasNotChanged(
      'mock2',
      {
        price: 100,
        rate: 1,
        secondaryRate: 1,
        secondaryRateType: 'mock2',
        numberOfReviews: 1,
        newlyAdded: true,
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
      }
    )

    // then
    expect(hotel.priceChanges.length).toBe(1)
    expect(hotel.priceChanges[0].value).toBe(100)
    expect(hotel.priceChanges[0].occurrenceCount).toBe(2)
    expect(hotel.priceChanges[0].changedAt).toBe('mock1')
    expect(hotel.collectedAt.length).toBe(2)
    expect(hotel.collectedAt[0]).toBe('mock1')
    expect(hotel.collectedAt[1]).toBe('mock2')
  })

  it('should update when price has not changed', () => {
    // given
    const hotel = new Hotel(
      'mock',
      'mock',
      'mock',
      0,
      'mock',
      {
        lat: 0,
        lon: 0,
      },
      'mock',
      'mock',
      1,
      ['mock1', 'mock2', 'mock3', 'mock4', 'mock5'],
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
      {
        price: 150,
        rate: 0,
        secondaryRate: 0,
        secondaryRateType: 'mock',
        numberOfReviews: 0,
        newlyAdded: false,
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
      }
    )

    // when
    hotel.updateWhenPriceHasNotChanged(
      'mock6',
      {
        price: 150,
        rate: 0,
        secondaryRate: 0,
        secondaryRateType: 'mock',
        numberOfReviews: 0,
        newlyAdded: false,
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
      }
    )

    // then
    expect(hotel.priceChanges.length).toBe(3)
    expect(hotel.priceChanges[2].value).toBe(150)
    expect(hotel.priceChanges[2].occurrenceCount).toBe(3)
    expect(hotel.priceChanges[2].changedAt).toBe('mock4')
    expect(hotel.collectedAt.length).toBe(6)
    expect(hotel.collectedAt[5]).toBe('mock6')
  })
})
