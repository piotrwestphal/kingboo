import { AppConfig } from '../src/config/app.config';

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    logLevel: env.LOG_LEVEL || 'info',
    corsOrigins: env.CORS_ORIGINS,
    saveRawResultInJson: env.SAVE_RAW_RESULT_IN_JSON === 'true',
    takeScreenshotOnError: env.TAKE_SCREENSHOT_ON_ERROR === 'true',
    puppeteer: {
      headlessModeOff: env.PUPPETEER_HEADLESS === 'true',
    },
    fauna: {
      secret: env.FAUNA_DB_SECRET,
    },
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        noAck: false,
        prefetchCount: 1,
        queue: env.MQ_COLLECTING_SCENARIO_QUEUE_NAME,
      },
    },
    dataCollectionNotificationsMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_DATA_COLLECTION_NOTIFICATIONS_QUEUE_NAME,
      },
    },
    dataToProcessMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_DATA_TO_PROCESS_QUEUE_NAME,
      },
    },
  });
