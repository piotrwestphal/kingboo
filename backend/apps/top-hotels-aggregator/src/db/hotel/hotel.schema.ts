import { Schema } from 'mongoose'
import { HotelDocument } from './hotel.document'

export const HotelSchemaKey = 'hotel'

export const HotelSchema = new Schema<HotelDocument>({
    searchId: String,
    hotelId: String,
    name: String,
    coords: Object,
    priceChanges: [Object],
    collectedAt: [Date],
    latestValues: Object,
    calculatedValues: Object,
    lastCollectedAt: Date,
    collectingCount: Number,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  })
