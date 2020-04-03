import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { MainConfig } from '../src/main.config';

const mqAddress = 'amqp://dev:dev@rabbitmq:5672';
const clientQueueName = 'client-queue-name';
const consumerQueueName = 'consumer-queue-name';

export const localConfig: MainConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost', // separate multiple origins by comma
  db: {
    dbName: 'temp',
    faunaAdminDb: {
      domain: 'localhost',
      scheme: 'http',
      port: 38443,
      secret: 'secret',
    },
  },
  mqConsumer: {
    address: mqAddress,
    queueDefinition: {
      queue: consumerQueueName,
      queueOptions: retrieveRMQQueueOptions(consumerQueueName),
    },
  },
  dataCollectorMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: clientQueueName,
      queueOptions: retrieveRMQQueueOptions(clientQueueName),
    },
  },
  userServiceMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: clientQueueName,
      queueOptions: retrieveRMQQueueOptions(clientQueueName),
    },
  },
};
