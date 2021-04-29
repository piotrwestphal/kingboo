import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { AppConfig } from './app.config';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';
import { PuppeteerOptions } from './puppeteer/puppeteer-options';
import { puppeteerSchemaMap } from './puppeteer/validation.schema';
import { cassandraValidationObjectSchema } from '@kb/cassandra'

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  takeScreenshotOnError: Joi.boolean().required(),
  rawSearchResultRetentionHours: Joi.number().required(),
  scrapActivitiesWithoutUpdateRetentionDays: Joi.number().required(),
  saveRawResultAsJson: Joi.boolean().required(),
  puppeteer: Joi.object<PuppeteerOptions>(puppeteerSchemaMap).required(),
  dataCollectionNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  dataToProcessMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
  cassandra: cassandraValidationObjectSchema.required(),
};
