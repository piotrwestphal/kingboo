import { Schema } from 'mongoose';
import { LatestValuesDocument } from '../document/latest-values.document';
import { BonusesSchema } from './bonuses.schema';
import { RoomSchema } from './room.schema';

export const LatestValuesSchema = new Schema<LatestValuesDocument>({
    price: Number,
    districtName: String,
    distanceFromCenterMeters: Number,
    distanceFromCenterOrderIndex: Number,
    hotelLink: String,
    roomName: String,
    rate: Number,
    secondaryRate: Number,
    secondaryRateType: String,
    numberOfReviews: Number,
    newlyAdded: Boolean,
    starRating: Number,
    bonuses: BonusesSchema,
    rooms: [RoomSchema],
  },
  {
    _id: false,
    versionKey: false,
  });
