import { RMQQueueDefinition } from '@kb/config/model/rmq-definition';

export interface MqOptions {
  readonly rmqAddress: string,
  readonly rmqConsumerQueue?: RMQQueueDefinition,
  readonly rmqClientQueue?: RMQQueueDefinition,
}
