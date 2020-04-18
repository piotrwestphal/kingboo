import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';
import { getMongoValidationSchemaMap } from '@kb/mongo/validation.schema';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';
import { getPuppeteerSchemaMap } from './puppeteer/validation.schema';
import { getFaunaValidationSchemaMap, FaunaOptions } from '@kb/fauna-client';

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  takeScreenshotOnError: Joi.boolean().required(),
  saveRawResultInJson: Joi.boolean().required(),
  puppeteer: Joi.object<PuppeteerOptions>(getPuppeteerSchemaMap).required(),
  fauna: Joi.object<FaunaOptions>(getFaunaValidationSchemaMap).required(),
  mongo: Joi.object<MongoOptions>(getMongoValidationSchemaMap).required(),
  dataCollectionNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  dataToProcessMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
};
