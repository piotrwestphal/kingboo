import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';

export const getMongoValidationSchema: SchemaMap<MongoOptions> = {
  address: Joi.string().required(),
};
