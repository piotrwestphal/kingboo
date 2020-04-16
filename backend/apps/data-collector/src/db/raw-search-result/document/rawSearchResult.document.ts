import { Document } from 'mongoose';
import { RawHotelDocument } from './rawHotel.document';
import { ObjectId } from 'bson';

export interface RawSearchResultDocument extends Document {
  readonly _id: ObjectId;
  readonly searchId: string;
  readonly createdAt: string;
  readonly scrapingTimeSeconds: number;
  readonly hotelsCount: number;
  readonly hotels: RawHotelDocument[];
}
