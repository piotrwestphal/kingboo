import { Coords, HotelCalculatedValuesDto, HotelLatestValuesDto, PriceChange } from '@kb/model'

export interface SimpleHotelDto {
  readonly searchId: string
  readonly hotelId: string
  readonly name: string
  readonly coords: Coords
  readonly priceChanges: PriceChange[]
  readonly latestValues: HotelLatestValuesDto
  readonly calculatedValues: HotelCalculatedValuesDto
  readonly lastCollectedAt: string
  readonly collectingCount: number
}
