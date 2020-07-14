import { Schema } from 'mongoose';
import { HotelDocument } from '../interface/hotel.document';
import { CoordsSchema } from './coords.schema';
import { PriceWithDateSchema } from './price-with-date.schema';
import { LatestValuesSchema } from './latest-values.schema';
import { CalculatedValuesSchema } from './calculated-values.schema';

export const HotelSchemaKey = 'hotel';

export const HotelSchema = new Schema<HotelDocument>({
    searchId: String,
    hotelId: String,
    name: String,
    distanceFromCenterMeters: Number,
    districtName: String,
    coords: CoordsSchema,
    hotelLink: String,
    propertyType: String,
    starRating: Number,
    prices: [PriceWithDateSchema],
    latestValues: LatestValuesSchema,
    calculatedValues: CalculatedValuesSchema,
    collectedAt: [String],
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  });
