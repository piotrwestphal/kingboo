import { Schema } from 'mongoose';
import { ValueWithDate } from '@kb/model/value-with-date';

export const PriceWithDateSchema = new Schema<ValueWithDate<number>>({
    value: Number,
    date: Date,
  },
  {
    _id: false,
    versionKey: false,
  });
