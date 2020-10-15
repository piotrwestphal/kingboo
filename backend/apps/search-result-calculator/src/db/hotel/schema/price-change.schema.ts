import { Schema } from 'mongoose';
import { PriceChangeDocument } from '../document/price-change.document';

export const PriceChangeSchema = new Schema<PriceChangeDocument>({
    value: Number,
    occurrenceCount: Number,
    changedAt: Date,
  },
  {
    _id: false,
    versionKey: false,
  });
