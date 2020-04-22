import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { SearchRequest } from '../core/model/SearchRequest';
import { OccupancyStatus } from '../core/model/OccupancyStatus';

export const searchRequestValidationSchemaMap: SchemaMap<SearchRequest> = {
  searchId: Joi.string().required(),
  priority: Joi.number().required(),
  updateFrequencyMinutes: Joi.number().required(),
  resultsLimit: Joi.number().required(),
  searchPlace: Joi.string().required(),
  checkInDate: Joi.date().greater('now').required(),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required(),
  numberOfRooms: Joi.number().required(),
  numberOfAdults: Joi.number().required(),
  childrenAgeAtCheckout: Joi.array().items(Joi.number()),
  searchPlaceIdentifier: Joi.optional(),
  occupancyStatus: Joi.string().valid(...Object.values(OccupancyStatus)).required(),
  occupancyUpdatedAt: Joi.date().required(),
};

