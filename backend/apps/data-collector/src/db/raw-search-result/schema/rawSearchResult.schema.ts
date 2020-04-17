import { Schema } from 'mongoose';
import { RawHotelSchema } from './rawHotel.schema';
import { RawSearchResultDocument } from '..';

export const RawSearchResultSchemaKey = 'rawSearchResult';

export const RawSearchResultSchema = new Schema<RawSearchResultDocument>({
    searchId: String,
    scrapingTimeSeconds: Number,
    collectingTimeSec: Number,
    hotelsCount: Number,
    hotels: [RawHotelSchema],
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  });
