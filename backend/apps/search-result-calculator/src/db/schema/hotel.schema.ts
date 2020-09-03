import { Schema } from 'mongoose';
import { HotelDocument } from '../interface/hotel.document';
import { CoordsSchema } from './coords.schema';
import { PriceChangeSchema } from './price-change.schema';
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
    priceChanges: [PriceChangeSchema],
    collectedAt: [Date],
    latestValues: LatestValuesSchema,
    calculatedValues: CalculatedValuesSchema,
    lastCollectedAt: Date,
    collectingCount: Number,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  });
