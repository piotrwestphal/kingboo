import { AppConfig } from '../src/config/app.config';

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    hotelsWithoutUpdateStorageDays: env.HOTELS_WITHOUT_UPDATE_STORAGE_DAYS
      ? parseInt(env.HOTELS_WITHOUT_UPDATE_STORAGE_DAYS, 10)
      : 7,
    saveResultAsJson: env.SAVE_SEARCH_RESULT_AS_JSON === 'true',
    mongo: {
      address: env.MONGO_ADDRESS
    },
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        noAck: false,
        prefetchCount: 5,
        queue: env.MQ_DATA_TO_PROCESS_QUEUE_NAME,
      },
    },
    userNotificationsMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_USER_NOTIFICATIONS_QUEUE_NAME,
      },
    },
  });
