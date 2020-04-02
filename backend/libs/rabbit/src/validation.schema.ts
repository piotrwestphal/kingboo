import * as Joi from '@hapi/joi';
import { RabbitOptions, RabbitQueueArgs, RabbitQueueDefinition, RabbitQueueOptions } from '@kb/rabbit';

export const rabbitValidationSchema: Joi.ObjectSchema = Joi.object<RabbitOptions>({
  address: Joi.string().required(),
  queueDefinition: Joi.object<RabbitQueueDefinition>({
    queue: Joi.string().required(),
    prefetchCount: Joi.number().optional(),
    noAck: Joi.boolean().optional(),
    queueOptions: Joi.object<RabbitQueueOptions>({
      autoDelete: Joi.boolean().optional(),
      durable: Joi.boolean().optional(),
      arguments: Joi.object<RabbitQueueArgs>({
        'x-message-ttl': Joi.number().optional(),
      }).optional(),
    }).optional(),
  }).required(),
}).required();
