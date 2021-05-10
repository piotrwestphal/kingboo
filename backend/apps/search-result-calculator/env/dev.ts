import { AppConfig } from '../src/config/app.config';
import { retrieveRMQQueueOptions } from '@kb/rabbit';

const mqAddress = (env) => env.MQ_ADDRESS;
const consumerQueueName = (env) => env.MQ_DATA_TO_PROCESS_QUEUE_NAME;
const dataUpdatesQueue = (env) => env.MQ_DATA_UPDATES_QUEUE_NAME;

export const devConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    saveResultAsJson: true,
    hotelsWithoutUpdateRetentionHours: 7,
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
    dataUpdatesMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: dataUpdatesQueue(env),
        queueOptions: retrieveRMQQueueOptions(dataUpdatesQueue(env)),
      },
    },
  });
