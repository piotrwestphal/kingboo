import { Schema } from 'mongoose';
import { TopHotelsCacheDocument } from './top-hotels-cache.document'

export const TopHotelsCacheSchemaKey = 'topHotels';

export const TopHotelsCacheSchema = new Schema<TopHotelsCacheDocument>({
    searchId: String,
    collectingStartedAt: String,
    collectingFinishedAt: String,
    topHotels: Object,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    }
  });
