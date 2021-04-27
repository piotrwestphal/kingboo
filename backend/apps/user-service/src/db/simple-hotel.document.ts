import { Coords, HotelCalculatedValuesDto, HotelLatestValuesDto } from '@kb/model'
import { Timestamp } from '@google-cloud/firestore'

export interface SimpleHotelDocument {
  readonly searchId: string
  readonly hotelId: string
  readonly name: string
  readonly coords: Coords
  readonly priceChanges: Array<{
    readonly value: number
    readonly occurrenceCount: number
    readonly changedAt: Timestamp
  }>
  readonly latestValues: HotelLatestValuesDto
  readonly calculatedValues: HotelCalculatedValuesDto
  readonly lastCollectedAt: Timestamp
  readonly collectingCount: number
}
