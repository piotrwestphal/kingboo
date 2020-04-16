import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { AppConfig } from '../src/config/app.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const consumerQueueName = 'data-collection-notifications';
const collectingScenarioQueue = 'collecting-scenario';
const userNotificationsQueue = 'user-notifications';

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost', // separate multiple origins by comma
  fauna: {
    dbName: 'temp',
    adminDb: {
      domain: 'localhost',
      scheme: 'http',
      port: 38443,
      secret: 'secret',
    },
  },
  mongo: {
    address: 'mongodb://127.0.0.1:27017/dev',
  },
  mqConsumer: {
    address: mqAddress,
    queueDefinition: {
      queue: consumerQueueName,
      queueOptions: retrieveRMQQueueOptions(consumerQueueName),
    },
  },
  collectingScenarioMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: collectingScenarioQueue,
      queueOptions: retrieveRMQQueueOptions(collectingScenarioQueue),
    },
  },
  userNotificationsMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: userNotificationsQueue,
      queueOptions: retrieveRMQQueueOptions(userNotificationsQueue),
    },
  },
};
