import { CoordsDocument } from './coords.document';
import { LatestValuesDocument } from './latest-values.document';
import { CalculatedValuesDocument } from './calculated-values.document';
import { Document } from 'mongoose';
import { PriceChangeDocument } from './price-change.document';

export interface HotelDocument extends Document {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly distanceFromCenterMeters: number;
  readonly districtName: string;
  readonly coords: CoordsDocument;
  readonly hotelLink: string;
  readonly propertyType: string;
  readonly starRating: number;
  readonly priceChanges: PriceChangeDocument[];
  readonly latestValues: LatestValuesDocument;
  readonly calculatedValues: CalculatedValuesDocument;
  readonly collectedAt: string[];
}
