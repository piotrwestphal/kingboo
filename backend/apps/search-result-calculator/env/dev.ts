import { AppConfig } from '../src/config/app.config';
import { retrieveRMQQueueOptions } from '@kb/rabbit';

const mqAddress = (env) => env.MQ_ADDRESS;
const consumerQueueName = (env) => env.MQ_DATA_TO_PROCESS_QUEUE_NAME;
const userNotificationsQueue = (env) => env.MQ_USER_NOTIFICATIONS_QUEUE_NAME;

export const devConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    saveResultAsJson: true,
    mongo: {
      address: env.MONGO_ADDRESS,
    },
    mqConsumer: {
      address: mqAddress(env),
      queueDefinition: {
        queue: consumerQueueName(env),
        noAck: false,
        prefetchCount: 5,
        queueOptions: retrieveRMQQueueOptions(consumerQueueName(env)),
      },
    },
    userNotificationsMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: userNotificationsQueue(env),
        queueOptions: retrieveRMQQueueOptions(userNotificationsQueue(env)),
      },
    },
  });
