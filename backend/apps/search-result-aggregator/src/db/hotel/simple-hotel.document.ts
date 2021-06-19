import { Document } from 'mongoose'
import { TimestampsDocument } from '@kb/mongo'
import { SimpleHotelDto } from '@kb/model'

export interface SimpleHotelDocument extends SimpleHotelDto, TimestampsDocument, Document {
}
