import { Document } from 'mongoose'
import { ObjectId } from 'bson'
import { TimestampsDocument } from '@kb/mongo/interface/timestamps.document'
import { SaveSearchRequest } from './save-search-request'

export interface SearchRequestDocument extends SaveSearchRequest, Document, TimestampsDocument {
  readonly _id: ObjectId
}
