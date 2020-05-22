import { PuppeteerOptions } from './puppeteer-options';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';

export const puppeteerSchemaMap: SchemaMap<PuppeteerOptions> = {
  headlessModeOff: Joi.boolean().required(),
  enableStylesOnResultsPage: Joi.boolean().required(),
  executablePath: Joi.string().optional(),
  slowMoMs: Joi.number().optional(),
  devtoolsTurnedOn: Joi.boolean().optional(),
};
