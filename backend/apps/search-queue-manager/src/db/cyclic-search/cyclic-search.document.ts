import { Document } from 'mongoose';
import { TimestampsDocument } from '@kb/mongo';
import { SaveCyclicSearch } from './save-cyclic-search';
import { ObjectId } from 'bson';

export interface CyclicSearchDocument extends SaveCyclicSearch, Document, TimestampsDocument {
  readonly _id: ObjectId;
}
