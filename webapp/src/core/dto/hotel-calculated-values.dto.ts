export interface HotelCalculatedValuesDto {
  readonly avgPrice: number | null
  readonly minPrice: number | null
  readonly maxPrice: number | null
  readonly avgPriceDiff: number
  readonly maxPriceDiff: number
  readonly priceRate: number
}
