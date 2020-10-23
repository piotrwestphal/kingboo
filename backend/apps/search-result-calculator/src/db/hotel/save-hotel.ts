import { Coords } from '@kb/model';
import { PriceChange } from '../../core/interface/price-change';
import { LatestValues } from '../../core/interface/latest-values';
import { CalculatedValues } from '../../core/interface/calculated-values';

export interface SaveHotel {
  readonly searchId: string
  readonly hotelId: string
  readonly name: string
  readonly coords: Coords
  readonly priceChanges: PriceChange[]
  readonly collectedAt: string[]
  readonly latestValues: LatestValues
  readonly calculatedValues: CalculatedValues
  readonly lastCollectedAt: string
  readonly collectingCount: number
}
