import { Document } from 'mongoose'
import { ValueChange } from '@kb/model'

export interface PriceChangeDocument extends ValueChange<number>, Document {
}
