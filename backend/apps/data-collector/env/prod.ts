import { AppConfig } from '../src/config/app.config'

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    rawSearchResultRetentionHours: env.RAW_SEARCH_RESULT_RETENTION_HOURS ? parseInt(env.RAW_SEARCH_RESULT_RETENTION_HOURS, 10) : 24,
    scrapActivitiesWithoutUpdateRetentionDays: env.SCRAP_ACTIVITY_WITHOUT_UPDATE_RETENTION_DAYS ? parseInt(env.SCRAP_ACTIVITY_WITHOUT_UPDATE_RETENTION_DAYS, 10) : 3,
    saveRawResultAsJson: env.SAVE_RAW_SEARCH_RESULT_AS_JSON === 'true',
    takeScreenshotOnError: env.TAKE_SCREENSHOT_ON_ERROR === 'true',
    puppeteer: {
      headlessModeOff: env.PUPPETEER_HEADLESS_MODE_OFF === 'true',
      enableStylesOnResultsPage: env.PUPPETEER_ENABLE_STYLES_ON_RESULTS_PAGE === 'true',
    },
    firestore: {
      projectId: env.FIRESTORE_PROJECT_ID,
      serviceAccountKeyJson: env.FIRESTORE_SERVICE_ACCOUNT_KEY_JSON,
    },
    mongo: {
      address: env.MONGO_ADDRESS,
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
  })
