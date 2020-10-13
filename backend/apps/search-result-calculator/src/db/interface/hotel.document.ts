import { CoordsDocument } from './coords.document';
import { LatestValuesDocument } from './latest-values.document';
import { CalculatedValuesDocument } from './calculated-values.document';
import { Document } from 'mongoose';
import { PriceChangeDocument } from './price-change.document';

export interface HotelDocument extends Document {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly coords: CoordsDocument;
  readonly priceChanges: PriceChangeDocument[];
  readonly collectedAt: string[];
  readonly latestValues: LatestValuesDocument;
  readonly calculatedValues: CalculatedValuesDocument;
  readonly lastCollectedAt: string;
  readonly collectingCount: number;
}
