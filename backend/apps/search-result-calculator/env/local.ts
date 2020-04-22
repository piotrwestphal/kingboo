import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { AppConfig } from '../src/config/app.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const consumerQueueName = 'data-to-process';
const userNotificationsQueue = 'user-notifications';

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost', // separate multiple origins by comma
  saveResultInJson: true,
  fauna: {
    dbName: 'dev',
    adminDb: {
      domain: 'localhost',
      scheme: 'http',
      port: 8443,
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
  userNotificationsMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: userNotificationsQueue,
      queueOptions: retrieveRMQQueueOptions(userNotificationsQueue),
    },
  },
};
