import { Document } from 'mongoose';

export interface PriceChangeDocument extends Document {
  readonly value: number;
  readonly occurrenceCount: number;
  readonly changedAt: string;
}
