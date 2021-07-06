import * as Joi from '@hapi/joi'
import { SchemaMap } from '@hapi/joi'
import { MongoOptions } from '@kb/mongo/interface/mongo-options'

export const mongoValidationSchemaMap: SchemaMap<MongoOptions> = {
  primaryAddress: Joi.string().required(),
  secondaryAddress: Joi.string().optional(),
}
