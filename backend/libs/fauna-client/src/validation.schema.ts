import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { FaunaAdminDbOptions, FaunaOptions } from '@kb/fauna-client';

export const getFaunaValidationSchemaMap: SchemaMap<FaunaOptions> = {
  dbName: Joi.string().required(),
  secret: Joi.string().optional(),
  faunaAdminDb: Joi.object<FaunaAdminDbOptions>({
    domain: Joi.string().required(),
    scheme: Joi.string().required(),
    port: Joi.number().required(),
    secret: Joi.string().required(),
  }).optional(),
};
