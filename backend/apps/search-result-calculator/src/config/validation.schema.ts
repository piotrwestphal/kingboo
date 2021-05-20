import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { mongoValidationSchemaMap } from '@kb/mongo';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';
import { storageValidationObjectSchema } from '@kb/storage'

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  mongo: Joi.object<MongoOptions>(mongoValidationSchemaMap).required(),
  storage: storageValidationObjectSchema.required(),
  hotelsWithoutUpdateRetentionHours: Joi.number().required(),
  dataUpdatesMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
};
