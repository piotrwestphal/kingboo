import { PuppeteerOptions } from './puppeteer-options';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';

export const getPuppeteerSchemaMap: SchemaMap<PuppeteerOptions> = {
  headlessModeOff: Joi.boolean().required(),
  executablePath: Joi.string().optional(),
  slowMoMs: Joi.number().optional(),
  devtoolsTurnedOn: Joi.boolean().optional(),
};
