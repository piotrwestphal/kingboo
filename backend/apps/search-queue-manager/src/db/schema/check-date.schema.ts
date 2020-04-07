import { Schema } from 'mongoose';
import { CheckDateDocument } from '../interface/checkDate.document';

export const CheckDateSchema = new Schema<CheckDateDocument>({
    year: Number,
    month: Number,
    day: Number,
  },
  {
    _id: false,
    versionKey: false,
  });
