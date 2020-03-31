import { ConfigOptions } from '@kb/config';
import { retrieveRMQQueueOptions } from './rmq-options.builder';

const clientQueueName = 'client-queue-name';
const consumerQueueName = 'consumer-queue-name';

export const config: ConfigOptions = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost', // separate multiple origins by comma
  db: {
    faunaAdminDb: {
      domain: 'localhost',
      scheme: 'http',
      port: 38443,
      secret: 'secret',
    },
  },
  mq: {
    rmqAddress: 'amqp://dev:dev@rabbitmq:5672',
    rmqClientQueue: {
      queue: clientQueueName,
      queueOptions: retrieveRMQQueueOptions(clientQueueName)
    },
    rmqConsumerQueue: {
      queue: consumerQueueName,
      prefetchCount: 1,
      noAck: false,
      queueOptions: retrieveRMQQueueOptions(consumerQueueName),
    },
  },
};
