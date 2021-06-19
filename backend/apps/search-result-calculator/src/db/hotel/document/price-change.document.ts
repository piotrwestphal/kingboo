import { Document } from 'mongoose'
import { PriceChange } from '@kb/model'

export interface PriceChangeDocument extends PriceChange, Document {
}
