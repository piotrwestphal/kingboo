import { Document } from 'mongoose'
import { TimestampsDocument } from '@kb/mongo/interface/timestamps.document'
import { SaveCache } from './save-cache'

export interface CacheDocument<T> extends SaveCache<T>, Document, TimestampsDocument {
}
