import { Schema } from 'mongoose';
import { SearchRequestDocument } from '../interface/search-request.document';

export const SearchRequestSchemaKey = 'searchRequest';

export const SearchRequestSchema = new Schema<SearchRequestDocument>({
    searchId: String,
    priority: Number,
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
    occupancyStatus: String,
    occupancyUpdatedAt: Date,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  });
