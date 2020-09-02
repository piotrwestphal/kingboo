import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';
import { puppeteerSchemaMap } from './puppeteer/validation.schema';
import { firestoreValidationObjectSchema } from '@kb/firestore';
import { MongoOptions, mongoValidationSchemaMap } from '@kb/mongo';

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  takeScreenshotOnError: Joi.boolean().required(),
  rawSearchResultRetentionHours: Joi.number().required(),
  scrapActivitiesWithoutUpdateRetentionDays: Joi.number().required(),
  saveRawResultAsJson: Joi.boolean().required(),
  puppeteer: Joi.object<PuppeteerOptions>(puppeteerSchemaMap).required(),
  userNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  dataCollectionNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  dataToProcessMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  firestore: firestoreValidationObjectSchema.required(),
  mongo: Joi.object<MongoOptions>(mongoValidationSchemaMap).required(),
};
