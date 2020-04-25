export interface CalculatedValuesDocument {
  readonly avgPrice: number;
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly avgPriceDiff: number;
  readonly maxPriceDiff: number;
  readonly priceRate: number;
}
