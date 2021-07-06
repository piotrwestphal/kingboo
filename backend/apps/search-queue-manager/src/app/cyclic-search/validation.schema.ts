import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { CreateCyclicSearch } from './create-cyclic-search';
import { CollectingScenarioType } from '@kb/model'

export const cyclicSearchValidationSchemaMap: SchemaMap<CreateCyclicSearch> = {
  scenarioType: Joi.string().valid(...Object.values(CollectingScenarioType)).required(),
  updateFrequencyMinutes: Joi.number().required(),
  resultsLimit: Joi.number().required(),
  searchPlace: Joi.string().required(),
  numberOfRooms: Joi.number().required(),
  numberOfAdults: Joi.number().required(),
  childrenAgeAtCheckout: Joi.array().items(Joi.number()),
  dayOfTheWeek: Joi.number().required(),
  nightsOfStay: Joi.number().required(),
  beginSearchDaysBefore: Joi.number().required(),
};
