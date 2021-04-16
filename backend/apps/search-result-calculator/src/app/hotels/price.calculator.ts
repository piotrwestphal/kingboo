import { CalculatedValues } from '../../core/interface/calculated-values'
import { ValueChange } from '@kb/model'

interface RepeatedValue {
  readonly value: number
  readonly occurrenceCount: number
}

export class PriceCalculator {
  calculate(currentPrice: number, priceChanges: ValueChange<number>[]): CalculatedValues {
    const pricesWithCurrentPrice: RepeatedValue[] = priceChanges.map(
      v => ({
        value: v.value,
        occurrenceCount: v.occurrenceCount
      })).concat({ value: currentPrice, occurrenceCount: 1 })
    const { avg, min, max } = this.calcBasicPriceValues(pricesWithCurrentPrice)
    return {
      minPrice: min,
      maxPrice: max,
      avgPrice: avg,
      avgPriceDiff: this.roundToTwoDecimalPlaces(avg - currentPrice),
      maxPriceDiff: this.roundToTwoDecimalPlaces(max - currentPrice),
      priceRate: this.calcPriceRate(currentPrice, max),
    }
  }

  private calcBasicPriceValues(values: RepeatedValue[]): { min: number, max: number, avg: number } {
    const averagePrice = this.calcAvgValue(values)
    const prices = values.map(v => v.value)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return {
      min,
      max,
      avg: this.roundToTwoDecimalPlaces(averagePrice),
    }
  }

  private calcAvgValue = (values: RepeatedValue[]): number => {
    const occurrencesSum = values.map(v => v.occurrenceCount).reduce((a, b) => a + b)
    const pricesSum = values.map(v => (v.value * v.occurrenceCount)).reduce((a, b) => a + b)
    return pricesSum / occurrencesSum
  }

  private calcPriceRate = (lastPrice: number, maxPrice: number): number => {
    if (lastPrice === maxPrice) {
      return 0
    }
    const percent = ((maxPrice - lastPrice) / maxPrice) * 100
    return Math.round(percent * 100) / 100
  }

  private roundToTwoDecimalPlaces = (value: number): number => Math.round(value * 100) / 100
}
