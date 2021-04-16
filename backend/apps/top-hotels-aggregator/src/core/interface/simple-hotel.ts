import { Coords, ValueChange } from '@kb/model'

export interface SimpleHotel {
  readonly searchId: string
  readonly hotelId: string
  readonly name: string
  readonly coords: Coords
  readonly priceChanges: ValueChange<number>[]
  readonly latestValues: Record<string, any>
  readonly calculatedValues: Record<string, number>
  readonly lastCollectedAt: string
  readonly collectingCount: number
}
