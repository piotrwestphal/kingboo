import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { AppConfig } from '../src/config/app.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const consumerQueueName = 'data-collection-notifications';
const collectingScenarioQueue = 'collecting-scenario';
const userNotificationsQueue = 'user-notifications';
const dataUpdatesQueue = 'data-updates';

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost:3000', // separate multiple origins by comma
  mongo: {
    primaryAddress: 'mongodb://127.0.0.1:27017/dev',
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
  dataUpdatesMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: dataUpdatesQueue,
      queueOptions: retrieveRMQQueueOptions(dataUpdatesQueue),
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
