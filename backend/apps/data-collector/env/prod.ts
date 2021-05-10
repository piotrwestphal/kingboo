import { AppConfig } from '../src/config/app.config'

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    rawSearchResultRetentionHours: parseInt(env.RAW_SEARCH_RESULT_RETENTION_HOURS, 10),
    scrapActivitiesWithoutUpdateRetentionHours: parseInt(env.SCRAP_ACTIVITY_WITHOUT_UPDATE_RETENTION_HOURS, 10),
    saveRawResultAsJson: env.SAVE_RAW_SEARCH_RESULT_AS_JSON === 'true',
    takeScreenshotOnError: env.TAKE_SCREENSHOT_ON_ERROR === 'true',
    puppeteer: {
      headlessModeOff: env.PUPPETEER_HEADLESS_MODE_OFF === 'true',
      enableStylesOnResultsPage: env.PUPPETEER_ENABLE_STYLES_ON_RESULTS_PAGE === 'true',
    },
    cassandra: {
      keyspace: env.ASTRA_DB_KEYSPACE,
      cloud: {
        secureConnectBundlePath: './db/cassandra/secure-connect-kingboo.zip',
        username: env.ASTRA_DB_USERNAME,
        password: env.ASTRA_DB_PASSWORD,
      }
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
