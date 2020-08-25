import { rabbitValidationSchemaMap } from '@kb/rabbit/validation.schema';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';

export const commonConfigValidationSchemaMap: SchemaMap = {
  nodeEnv: Joi.string().valid('dev', 'prod', 'ci', 'local').required(),
  port: Joi.number().required(),
  corsOrigins: Joi.string().allow('').required(),
  mqConsumer: rabbitValidationSchemaMap,
};
