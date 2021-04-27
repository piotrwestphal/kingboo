import { PriceCalculator } from './price.calculator';
import { ValueChange } from '@kb/model'

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

  it('should calculate correct values', () => {
    // given
    const currentPrice = 100
    const priceChanges: ValueChange<number>[] = [
      {
        value: 200,
        occurrenceCount: 5,
        changedAt: null,
      },
      {
        value: 100,
        occurrenceCount: 2,
        changedAt: null,
      },
      {
        value: 150,
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
});
