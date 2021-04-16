import * as Joi from '@hapi/joi'
import { SchemaMap } from '@hapi/joi'
import { CreateSearchRequest } from './create-search-request'

export const createSearchRequestValidationSchemaMap: SchemaMap<CreateSearchRequest> = {
  updateFrequencyMinutes: Joi.number().required(),
  resultsLimit: Joi.number().required(),
  searchPlace: Joi.string().required(),
  checkInDate: Joi.date().greater('now').required(),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required(),
  numberOfRooms: Joi.number().required(),
  numberOfAdults: Joi.number().required(),
  childrenAgeAtCheckout: Joi.array().items(Joi.number()),
}

