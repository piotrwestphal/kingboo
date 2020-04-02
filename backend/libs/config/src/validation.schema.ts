import { CommonConfig } from '@kb/config/model/common-config';
import { rabbitValidationSchema } from '@kb/rabbit/validation.schema';
import { ObjectSchema } from '@hapi/joi';
import * as Joi from '@hapi/joi';

export const commonConfigValidationSchema: ObjectSchema = Joi.object<CommonConfig>({
  nodeEnv: Joi.string().valid('dev', 'prod', 'ci', 'local').required(),
  port: Joi.number().required(),
  corsOrigins: Joi.string().required(),
  mqConsumer: rabbitValidationSchema,
});
