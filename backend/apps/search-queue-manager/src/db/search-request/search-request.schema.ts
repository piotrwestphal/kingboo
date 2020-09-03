import { Schema } from 'mongoose';
import { SearchRequestDocument } from './search-request.document';

export const SearchRequestSchemaKey = 'searchRequest';

export const SearchRequestSchema = new Schema<SearchRequestDocument>({
    searchId: String,
    type: String,
    updateFrequencyMinutes: Number,
    resultsLimit: Number,
    // Scenario parameters
    searchPlace: String,
    checkInDate: Date,
    checkOutDate: Date,
    numberOfRooms: Number,
    numberOfAdults: Number,
    childrenAgeAtCheckout: [Number],

    searchPlaceIdentifier: String,
    nextSearchScheduledAt: Date,
    collectingStartedAt: Date,
    collectingFinishedAt: Date,
    collectingCount: Number,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  });
