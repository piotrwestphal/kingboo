import { Coords } from '@kb/model';
import { LatestValues } from './latest-values';
import { CalculatedValues } from './calculated-values';
import { PriceChange } from './price-change';

export interface SimpleHotel {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly coords: Coords;
  readonly priceChanges: PriceChange[];
  readonly latestValues: LatestValues;
  readonly calculatedValues: CalculatedValues;
  readonly lastCollectedAt: string;
  readonly collectingCount: number;
}
