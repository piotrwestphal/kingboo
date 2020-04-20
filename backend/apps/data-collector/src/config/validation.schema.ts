import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';
import { mongoValidationSchemaMap } from '@kb/mongo/validation.schema';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';
import { puppeteerSchemaMap } from './puppeteer/validation.schema';
import { faunaValidationObjectSchema } from '@kb/fauna-client';

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  takeScreenshotOnError: Joi.boolean().required(),
  saveRawResultInJson: Joi.boolean().required(),
  puppeteer: Joi.object<PuppeteerOptions>(puppeteerSchemaMap).required(),
  fauna: faunaValidationObjectSchema,
  mongo: Joi.object<MongoOptions>(mongoValidationSchemaMap).required(),
  dataCollectionNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  dataToProcessMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
};
