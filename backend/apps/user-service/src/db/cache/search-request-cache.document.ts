import { Document } from 'mongoose';
import { ObjectId } from 'bson';
import { TimestampsDocument } from '@kb/mongo/interface/timestamps.document';
import { SaveCache } from './save-cache';

export interface CacheDocument<T> extends SaveCache<T>, Document, TimestampsDocument {
  readonly _id: ObjectId;
}
