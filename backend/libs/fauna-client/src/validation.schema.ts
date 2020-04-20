import * as Joi from '@hapi/joi';
import { ObjectSchema } from '@hapi/joi';
import { FaunaAdminDbOptions, FaunaOptions } from '@kb/fauna-client';

export const faunaValidationObjectSchema: ObjectSchema<FaunaOptions> = Joi.object<FaunaOptions>({
  dbName: Joi.string(),
  secret: Joi.string(),
  adminDb: Joi.object<FaunaAdminDbOptions>({
    domain: Joi.string().required(),
    scheme: Joi.string().required(),
    port: Joi.number().required(),
    secret: Joi.string().required(),
  }),
}).xor('secret', 'adminDb')
  .xor('secret', 'dbName')
  .with('adminDb', 'dbName');
