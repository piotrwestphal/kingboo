import { AppConfig } from '../src/config/app.config';
import { retrieveRMQQueueOptions } from '@kb/rabbit';

const mqAddress = (env) => env.MQ_ADDRESS;
const consumerQueueName = (env) => env.MQ_CONSUMER_QUEUE_NAME;
const collectingScenarioQueue = (env) => env.MQ_COLLECTING_SCENARIO_QUEUE_NAME;
const userNotificationsQueue = (env) => env.MQ_USER_NOTIFICATIONS_QUEUE_NAME;

export const devConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    mongo: {
      address: env.MONGO_ADDRESS,
    },
    mqConsumer: {
      address: mqAddress(env),
      queueDefinition: {
        queue: consumerQueueName(env),
        queueOptions: retrieveRMQQueueOptions(consumerQueueName(env)),
      },
    },
    collectingScenarioMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: collectingScenarioQueue(env),
        queueOptions: retrieveRMQQueueOptions(collectingScenarioQueue(env)),
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
