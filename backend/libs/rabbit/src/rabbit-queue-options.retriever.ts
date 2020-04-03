import * as rmqDefinitions from '../../../mq/rmq-definitions.json';
import { RabbitQueueOptions } from '@kb/rabbit';

interface QueueDefinition {
  name: string;
  vhost: string;
  durable: boolean;
  auto_delete: boolean;
  arguments: {
    'x-queue-type': string,
    'x-message-ttl'?: number,
  };
}

interface QueueOptions {
  autoDelete?: boolean;
  durable?: boolean;
  arguments?: Arguments;
}

interface Arguments {
  'x-message-ttl'?: number;
}

const mapJsonQueueDefinition = (): Map<string, QueueOptions> => {
  const queueDefinitions = rmqDefinitions.queues as QueueDefinition[];
  return queueDefinitions.reduce((acc, q) => {
    let queueOptions: QueueOptions = {
      durable: q.durable,
      autoDelete: q.auto_delete,
    };
    if (q.arguments?.['x-message-ttl']) {
      queueOptions = {
        ...queueOptions,
        arguments: {
          'x-message-ttl': q.arguments['x-message-ttl'],
        },
      };
    }
    return acc.set(q.name, queueOptions);
  }, new Map<string, QueueOptions>());
};

const queueOptionsMap: Map<string, QueueOptions> = mapJsonQueueDefinition();

export const retrieveRMQQueueOptions = (queueName: string): RabbitQueueOptions | undefined =>
  queueOptionsMap.get(queueName);
