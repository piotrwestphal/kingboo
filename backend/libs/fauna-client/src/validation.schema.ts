import * as Joi from '@hapi/joi';
import { ObjectSchema } from '@hapi/joi';
import { FaunaAdminDbOptions, FaunaClientOptions } from '@kb/fauna-client';

export const faunaValidationObjectSchema: ObjectSchema<FaunaClientOptions> = Joi.object<FaunaClientOptions>({
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
