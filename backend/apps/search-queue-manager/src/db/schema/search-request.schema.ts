import { Schema } from 'mongoose';
import { SearchRequestDocument } from '../interface/searchRequest.document';
import { CheckDateSchema } from './check-date.schema';

export const SearchRequestSchemaKey = 'searchRequest';

export const SearchRequestSchema = new Schema<SearchRequestDocument>({
    searchId: String,
    priority: Number,
    updateFrequencyMinutes: Number,
    resultsLimit: Number,
    // Scenario parameters
    searchPlace: String,
    checkInDate: CheckDateSchema,
    checkOutDate: CheckDateSchema,
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
