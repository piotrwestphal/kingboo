import { Schema } from 'mongoose';
import { LatestValuesDocument } from '../interface/latest-values.document';
import { BonusesSchema } from './bonuses.schema';
import { RoomSchema } from './room.schema';

export const LatestValuesSchema = new Schema<LatestValuesDocument>({
    price: Number,
    rate: Number,
    secondaryRate: Number,
    secondaryRateType: String,
    numberOfReviews: Number,
    newlyAdded: Boolean,
    bonuses: BonusesSchema,
    rooms: [RoomSchema],
  },
  {
    _id: false,
    versionKey: false,
  });
