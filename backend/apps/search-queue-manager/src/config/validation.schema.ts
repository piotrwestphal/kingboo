import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { MongoOptions, mongoValidationSchemaMap } from '@kb/mongo';

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  mongo: Joi.object<MongoOptions>(mongoValidationSchemaMap).required(),
  collectingScenarioMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  userNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
};
