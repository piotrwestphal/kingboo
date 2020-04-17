import { Schema } from 'mongoose';
import { RawRoomSchema } from './rawRoomSchema';
import { RawHotelDocument } from '..';

export const RawHotelSchema = new Schema<RawHotelDocument>({
    hotelId: String,
    // following parameters always exist
    name: String,
    price: String,
    tax: String,
    distanceFromCenter: String,
    districtName: String,
    coords: String,
    hotelLink: String,
    // following parameters might not be available
    rate: String,
    secondaryRateType: String,
    secondaryRate: String,
    numberOfReviews: String,
    propertyType: String,
    starRating: String,
    newlyAdded: String,
    bonuses: [String],
    rooms: [RawRoomSchema],
  },
  {
    _id: false,
    versionKey: false,
  });
