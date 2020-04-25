import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { faunaValidationObjectSchema } from '@kb/fauna-client';
import { mongoValidationSchemaMap } from '@kb/mongo';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  saveResultInJson: Joi.boolean().required(),
  fauna: faunaValidationObjectSchema,
  mongo: Joi.object<MongoOptions>(mongoValidationSchemaMap).required(),
  userNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
};
