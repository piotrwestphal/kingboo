import { Coords } from '@kb/model';
import { LatestValues } from './latest-values';
import { CalculatedValues } from './calculated-values';

export interface SimpleHotel {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly distanceFromCenterMeters: number;
  readonly districtName: string;
  readonly coords: Coords;
  readonly hotelLink: string;
  readonly propertyType: string;
  readonly starRating: number;
  readonly latestValues: LatestValues;
  readonly calculatedValues: CalculatedValues;
}