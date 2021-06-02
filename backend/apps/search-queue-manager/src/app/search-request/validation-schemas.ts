import * as Joi from '@hapi/joi'
import { SchemaMap } from '@hapi/joi'
import { CreateSearchRequest } from './create-search-request'
import { CollectingScenarioType } from '@kb/model'

const baseValidationSchemaMap: SchemaMap<CreateSearchRequest> = {
  updateFrequencyMinutes: Joi.number().required(),
  searchPlace: Joi.string().required(),
  checkInDate: Joi.date().greater('now').required(),
  checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required(),
  numberOfRooms: Joi.number().required(),
  numberOfAdults: Joi.number().required(),
  childrenAgeAtCheckout: Joi.array().items(Joi.number()),
}

export const collectingHotelsScenarioRequestValidationSchemaMap: SchemaMap<CreateSearchRequest> = {
  ...baseValidationSchemaMap,
  scenarioType: Joi.string().valid(CollectingScenarioType.COLLECT_HOTELS),
  resultsLimit: Joi.number().required(),
}

export const collectingPlaceScenarioRequestValidationSchemaMap: SchemaMap<CreateSearchRequest> = {
  ...baseValidationSchemaMap,
  scenarioType: Joi.string().valid(CollectingScenarioType.COLLECT_PLACE),
}
