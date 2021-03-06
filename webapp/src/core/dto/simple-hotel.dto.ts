import { Coords } from '../coords'
import { HotelLatestValuesDto } from './hotel-latest-values.dto'
import { HotelCalculatedValuesDto } from './hotel-calculated-values.dto'
import { HotelPriceChangeDto } from './hotel-price-change.dto'

export interface SimpleHotelDto {
  readonly searchId: string
  readonly hotelId: string
  readonly name: string
  readonly coords: Coords
  readonly priceChanges: HotelPriceChangeDto[]
  readonly latestValues: HotelLatestValuesDto
  readonly calculatedValues: HotelCalculatedValuesDto
  readonly lastCollectedAt: string
  readonly collectingCount: number
}
