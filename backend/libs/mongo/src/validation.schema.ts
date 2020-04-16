import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { MongoOptions } from '@kb/mongo/interface/mongo-options';

export const getMongoValidationSchemaMap: SchemaMap<MongoOptions> = {
  address: Joi.string().required(),
};
