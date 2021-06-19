import { PriceCalculator } from './price.calculator';
import { PriceChange } from '@kb/model'

describe('PriceCalculator', () => {

  let priceCalculator: PriceCalculator

  beforeEach(() => {
    priceCalculator = new PriceCalculator()
  })

  it('should calculate correct values with only current price', () => {
    // given
    const currentPrice = 100
    const priceChanges = []

    // when
    const {
      avgPrice,
      avgPriceDiff,
      maxPrice,
      maxPriceDiff,
      minPrice,
      priceRate
    } = priceCalculator.calculate(currentPrice, priceChanges)

    // then
    expect(avgPrice).toBe(100)
    expect(avgPriceDiff).toBe(0)
    expect(maxPrice).toBe(100)
    expect(maxPriceDiff).toBe(0)
    expect(minPrice).toBe(100)
    expect(priceRate).toBe(0)
  })

  it('should calculate correct values [1]', () => {
    // given
    const currentPrice = 100
    const priceChanges: PriceChange[] = [
      {
        price: 200,
        room: null,
        occurrenceCount: 5,
        changedAt: null,
      },
      {
        price: 100,
        room: null,
        occurrenceCount: 2,
        changedAt: null,
      },
      {
        price: 150,
        room: null,
        occurrenceCount: 3,
        changedAt: null,
      },
    ]

    // when
    const {
      avgPrice,
      avgPriceDiff,
      maxPrice,
      maxPriceDiff,
      minPrice,
      priceRate
    } = priceCalculator.calculate(currentPrice, priceChanges)

    // then
    expect(avgPrice).toBe(159.09)
    expect(avgPriceDiff).toBe(59.09)
    expect(maxPrice).toBe(200)
    expect(maxPriceDiff).toBe(100)
    expect(minPrice).toBe(100)
    expect(priceRate).toBe(50)
  })

  it('should calculate correct values [2]', () => {
    // given
    const currentPrice = 100
    const priceChanges: PriceChange[] = [
      {
        price: null,
        room: null,
        occurrenceCount: 5,
        changedAt: null,
      },
      {
        price: 100,
        room: 'simple',
        occurrenceCount: 2,
        changedAt: null,
      },
      {
        price: 150,
        room: 'premium',
        occurrenceCount: 3,
        changedAt: null,
      },
      {
        price: null,
        room: null,
        occurrenceCount: 1,
        changedAt: null,
      },
    ]

    // when
    const {
      avgPrice,
      avgPriceDiff,
      maxPrice,
      maxPriceDiff,
      minPrice,
      priceRate
    } = priceCalculator.calculate(currentPrice, priceChanges)

    // then
    expect(avgPrice).toBe(125)
    expect(avgPriceDiff).toBe(25)
    expect(maxPrice).toBe(150)
    expect(maxPriceDiff).toBe(50)
    expect(minPrice).toBe(100)
    expect(priceRate).toBe(33.33)
  })
});
