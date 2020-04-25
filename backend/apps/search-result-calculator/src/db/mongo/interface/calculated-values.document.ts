import { Document } from 'mongoose';

export interface CalculatedValuesDocument extends Document {
  readonly avgPrice: number;
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly avgPriceDiff: number;
  readonly maxPriceDiff: number;
  readonly priceRate: number;
}
