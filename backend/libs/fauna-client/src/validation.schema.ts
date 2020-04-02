import * as Joi from '@hapi/joi';
import { FaunaOptions } from '@kb/fauna-client';
import { FaunaAdminDbOptions } from '@kb/fauna-client';

export const getFaunaValidationSchema: Joi.ObjectSchema = Joi.object<FaunaOptions>({
  secret: Joi.string().optional(),
  faunaAdminDb: Joi.object<FaunaAdminDbOptions>({
    domain: Joi.string().required(),
    scheme: Joi.string().required(),
    port: Joi.number().required(),
    secret: Joi.string().required(),
  }).optional(),
}).optional();
