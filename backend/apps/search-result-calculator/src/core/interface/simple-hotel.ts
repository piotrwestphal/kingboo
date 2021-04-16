import { Coords, ValueChange } from '@kb/model'
import { LatestValues } from './latest-values'
import { CalculatedValues } from './calculated-values'

export interface SimpleHotel {
  readonly searchId: string
  readonly hotelId: string
  readonly name: string
  readonly coords: Coords
  readonly priceChanges: ValueChange<number>[]
  readonly latestValues: LatestValues
  readonly calculatedValues: CalculatedValues
  readonly lastCollectedAt: string
  readonly collectingCount: number
}
