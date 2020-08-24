import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  searchRequestsResourceAddress: Joi.string().required(),
  topHotelsResourceAddress: Joi.string().required(),
};
