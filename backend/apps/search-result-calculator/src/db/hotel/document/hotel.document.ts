import { Document } from 'mongoose';
import { SaveHotel } from '../save-hotel';
import { ObjectId } from 'bson';

export interface HotelDocument extends SaveHotel, Document {
  readonly _id: ObjectId;
}
