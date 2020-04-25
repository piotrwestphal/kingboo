import { ValueWithDate } from '@kb/model/value-with-date';
import { CalculatedValues } from '../core/interface/calculated-values';

export class PriceCalculator {
  calculate(lastPrice: number, pricesWithDate: ValueWithDate<number>[]): CalculatedValues {
    const pricesWithLastPrice = pricesWithDate.map(v => v.value).concat(lastPrice);
    const { avg, min, max } = this.calcBasicPriceValues(pricesWithLastPrice);
    return {
      minPrice: min,
      maxPrice: max,
      avgPrice: avg,
      avgPriceDiff: this.roundToTwoDecimalPlaces(avg - lastPrice),
      maxPriceDiff: this.roundToTwoDecimalPlaces(max - lastPrice),
      priceRate: this.calcPriceRate(lastPrice, max),
    }
  }

  private calcBasicPriceValues(prices: number[]): { min: number, max: number, avg: number } {
    const averagePrice = prices.length > 0
      ? this.calcAvgValue(prices)
      : null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return {
      min,
      max,
      avg: this.roundToTwoDecimalPlaces(averagePrice),
    };
  }

  private roundToTwoDecimalPlaces = (value: number): number => Math.round(value * 100) / 100;

  private calcAvgValue = (array: number[]): number => array.reduce((a, b) => a + b) / array.length;

  private calcPriceRate = (lastPrice: number, maxPrice: number): number => {
    if (lastPrice === maxPrice) {
      return 0;
    }
    const percent = ((maxPrice - lastPrice) / maxPrice) * 100;
    return Math.round(percent * 100) / 100;
  }
}
