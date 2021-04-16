import { SimpleHotel } from '../../core/interface/simple-hotel'
import { Document } from 'mongoose';
import { TimestampsDocument } from '@kb/mongo'

export interface SimpleHotelDocument extends SimpleHotel, TimestampsDocument, Document {
}
