import { CoordsDocument } from './coords.document';
import { LatestValuesDocument } from './latest-values.document';
import { CalculatedValuesDocument } from './calculated-values.document';
import { ValueWithDate } from '@kb/model/value-with-date';

export interface HotelDocument {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly distanceFromCenterMeters: number;
  readonly districtName: string;
  readonly coords: CoordsDocument;
  readonly hotelLink: string;
  readonly propertyType: string;
  readonly starRating: number;
  readonly prices: ValueWithDate<number>[];
  readonly latestValues: LatestValuesDocument;
  readonly calculatedValues: CalculatedValuesDocument;
  readonly collectedAt: string[];
}
