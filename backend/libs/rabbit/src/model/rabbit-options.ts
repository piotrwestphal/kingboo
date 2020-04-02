import { RabbitQueueDefinition } from './rabbit-queue-definition';

export interface RabbitOptions {
  readonly address: string,
  readonly queueDefinition: RabbitQueueDefinition,
}
