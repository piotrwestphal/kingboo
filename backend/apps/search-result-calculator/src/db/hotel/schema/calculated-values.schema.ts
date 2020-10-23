import { Schema } from 'mongoose';
import { CalculatedValuesDocument } from '../document/calculated-values.document';

export const CalculatedValuesSchema = new Schema<CalculatedValuesDocument>({
    avgPrice: Number,
    minPrice: Number,
    maxPrice: Number,
    avgPriceDiff: Number,
    maxPriceDiff: Number,
    priceRate: Number,
  },
  {
    _id: false,
    versionKey: false,
  });
