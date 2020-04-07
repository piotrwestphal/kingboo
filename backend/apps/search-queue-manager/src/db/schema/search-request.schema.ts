import { Schema } from 'mongoose';
import { SearchRequestDocument } from '../interface/searchRequest.document';
import { CheckDateSchema } from './check-date.schema';

export const SearchRequestSchemaKey = 'searchRequest';

export const SearchRequestSchema = new Schema<SearchRequestDocument>({
    searchId: String,
    priority: Number,
    updateFrequencyMinutes: Number,
    resultsLimit: Number,
    occupancyStatus: String,
    occupancyUpdatedAt: Date,
    owner: String,
    // Scenario parameters
    searchPlace: String,
    checkInDate: CheckDateSchema,
    checkOutDate: CheckDateSchema,
    numberOfRooms: Number,
    numberOfAdults: Number,
    childrenAgeAtCheckout: [Number],
    currency: String,
    language: String,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  });
