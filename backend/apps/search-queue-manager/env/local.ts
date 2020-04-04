import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { MainConfig } from '../src/main.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const clientQueueName = 'collecting-scenario';
const consumerQueueName = 'collecting-scenario-progress';

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
      queue: clientQueueName,
      queueOptions: retrieveRMQQueueOptions(clientQueueName),
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
