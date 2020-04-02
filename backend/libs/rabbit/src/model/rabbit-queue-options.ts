import { RabbitQueueArgs } from './rabbit-queue-args';

export interface RabbitQueueOptions {
  autoDelete?: boolean; // default: false
  durable?: boolean; // default: true
  arguments?: RabbitQueueArgs;
}
