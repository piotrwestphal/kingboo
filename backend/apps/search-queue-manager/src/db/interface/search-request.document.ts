import { Document } from 'mongoose';
import { ObjectId } from 'bson';
import { TimestampsDocument } from '@kb/mongo/interface/timestamps.document';
import { BaseSearchRequestDocument } from './base-search-request.document';

export interface SearchRequestDocument extends BaseSearchRequestDocument, Document, TimestampsDocument {
  readonly _id: ObjectId;
}
