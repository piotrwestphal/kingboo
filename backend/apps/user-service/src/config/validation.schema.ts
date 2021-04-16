import * as Joi from '@hapi/joi'
import { SchemaMap } from '@hapi/joi'
import { AppConfig } from './app.config'
import { MongoOptions, mongoValidationSchemaMap } from '@kb/mongo'

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  mongo: Joi.object<MongoOptions>(mongoValidationSchemaMap).required(),
  searchRequestsResourceAddress: Joi.string().required(),
}
