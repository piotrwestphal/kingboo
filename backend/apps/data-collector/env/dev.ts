import { AppConfig } from '../src/config/app.config';
import { retrieveRMQQueueOptions } from '@kb/rabbit';

const mqAddress = (env) => env.MQ_ADDRESS;
const consumerQueueName = (env) => env.MQ_COLLECTING_SCENARIO_QUEUE_NAME;
const dataCollectionNotificationsQueue = (env) => env.MQ_DATA_COLLECTION_NOTIFICATIONS_QUEUE_NAME;
const dataToProcessQueue = (env) => env.MQ_DATA_TO_PROCESS_QUEUE_NAME;

export const devConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    saveRawResultInJson: true,
    takeScreenshotOnError: true,
    puppeteer: {
      headlessModeOff: false,
    },
    fauna: {
      dbName: env.FAUNA_DB_NAME,
      adminDb: {
        domain: env.FAUNA_ADMIN_DB_DOMAIN,
        scheme: env.FAUNA_ADMIN_DB_SCHEME as 'http' | 'https',
        port: parseInt(env.FAUNA_ADMIN_DB_PORT, 10),
        secret: env.FAUNA_ADMIN_DB_SECRET,
      },
    },
    mqConsumer: {
      address: mqAddress(env),
      queueDefinition: {
        queue: consumerQueueName(env),
        noAck: false,
        prefetchCount: 1,
        queueOptions: retrieveRMQQueueOptions(consumerQueueName(env)),
      },
    },
    dataCollectionNotificationsMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: dataCollectionNotificationsQueue(env),
        queueOptions: retrieveRMQQueueOptions(dataCollectionNotificationsQueue(env)),
      },
    },
    dataToProcessMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: dataToProcessQueue(env),
        queueOptions: retrieveRMQQueueOptions(dataToProcessQueue(env)),
      },
    },
  });
