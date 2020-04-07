import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { FaunaOptions, getFaunaValidationSchemaMap } from '@kb/fauna-client';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';
import { getMongoValidationSchema } from '@kb/mongo/validation.schema';

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  fauna: Joi.object<FaunaOptions>(getFaunaValidationSchemaMap).required(),
  mongo: Joi.object<MongoOptions>(getMongoValidationSchema).required(),
  dataCollectionNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  userNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
};
