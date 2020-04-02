import { RabbitQueueOptions } from './rabbit-queue-options';

export interface RabbitQueueDefinition {
  queue: string;
  prefetchCount?: number;
  noAck?: boolean; // default: false TODO: check it!!
  queueOptions?: RabbitQueueOptions;
}

