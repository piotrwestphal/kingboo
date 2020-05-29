import { RabbitQueueOptions } from './rabbit-queue-options';

export interface RabbitQueueDefinition {
  queue: string;
  prefetchCount?: number;
  noAck?: boolean;
  queueOptions?: RabbitQueueOptions;
}

