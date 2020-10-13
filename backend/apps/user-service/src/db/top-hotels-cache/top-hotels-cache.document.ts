import { Document } from 'mongoose';
import { ObjectId } from 'bson';
import { TimestampsDocument } from '@kb/mongo/interface/timestamps.document';
import { SaveTopHotelsCache } from './save-top-hotels-cache';

export interface TopHotelsCacheDocument extends SaveTopHotelsCache, Document, TimestampsDocument {
  readonly _id: ObjectId;
}
