import { Schema } from 'mongoose'
import { CyclicSearchDocument } from './cyclic-search.document'

export const CyclicSearchSchemaKey = 'cyclicSearch'

export const CyclicSearchSchema = new Schema<CyclicSearchDocument>({
    cyclicId: String,
    updateFrequencyMinutes: Number,
    resultsLimit: Number,
    searchPlace: String,
    numberOfRooms: Number,
    numberOfAdults: Number,
    childrenAgeAtCheckout: [Number],
    dayOfTheWeek: Number,
    nightsOfStay: Number,
    beginSearchDaysBefore: Number,
    cyclicSearchRequests: [String],
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  })
