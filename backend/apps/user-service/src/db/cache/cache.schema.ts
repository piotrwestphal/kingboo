import { Schema } from 'mongoose';
import { CacheDocument } from './search-request-cache.document';

export const CacheSchema = new Schema<CacheDocument<any>>({
    searchId: String,
    collectingStartedAt: String,
    collectingFinishedAt: String,
    data: Object,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    }
  });
