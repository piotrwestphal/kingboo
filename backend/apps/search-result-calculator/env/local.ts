import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { AppConfig } from '../src/config/app.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const consumerQueueName = 'data-to-process';
const userNotificationsQueue = 'user-notifications';

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  logLevel: 'debug',
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
  mongo: {
    address: 'mongodb://127.0.0.1:27017/dev',
  },
  mqConsumer: {
    address: mqAddress,
    queueDefinition: {
      queue: consumerQueueName,
      noAck: false,
      prefetchCount: 5,
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
