import * as rmqDefinitions from './rmq-definitions.json';
import { RMQQueueOptions } from '@kb/config';

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
console.log({queueOptionsMap});

export const retrieveRMQQueueOptions = (queueName: string): RMQQueueOptions | undefined => {
  console.log('Retrieved RMQ config: ', queueOptionsMap.get(queueName));
  return queueOptionsMap.get(queueName);
};
