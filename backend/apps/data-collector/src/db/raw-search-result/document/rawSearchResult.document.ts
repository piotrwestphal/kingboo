import { Document } from 'mongoose';
import { RawHotelDocument } from './rawHotel.document';
import { ObjectId } from 'bson';

export interface RawSearchResultDocument extends Document {
  readonly _id: ObjectId;
  readonly searchId: string;
  readonly searchPlaceIdentifier: string;
  readonly collectingTimeSec: number;
  readonly hotelsCount: number;
  readonly hotels: RawHotelDocument[];
  readonly createdAt: string;
}
