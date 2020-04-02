import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { MainConfig } from './main.config';
import { FaunaOptions, getFaunaValidationSchemaMap } from '@kb/fauna-client';
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit';

export const mainConfigValidationSchemaMap: SchemaMap<MainConfig> = {
  db: Joi.object<FaunaOptions>(getFaunaValidationSchemaMap).required(),
  mqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
};
