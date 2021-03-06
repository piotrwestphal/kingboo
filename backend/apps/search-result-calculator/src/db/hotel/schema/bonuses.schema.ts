import { Schema } from 'mongoose';
import { BonusesDocument } from '../document/bonuses.document';

export const BonusesSchema = new Schema<BonusesDocument>({
    freeCancellation: Boolean,
    cancelLater: Boolean,
    noPrepayment: Boolean,
    breakfastIncluded: Boolean,
  },
  {
    _id: false,
    versionKey: false,
  });
