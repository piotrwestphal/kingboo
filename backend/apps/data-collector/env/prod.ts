import { AppConfig } from '../src/config/app.config'

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    puppeteer: {
      headlessModeOff: env.PUPPETEER_HEADLESS_MODE_OFF === 'true',
      enableStylesOnResultsPage: env.PUPPETEER_ENABLE_STYLES_ON_RESULTS_PAGE === 'true',
    },
    storage: {
      remote: {
        projectId: env.GCP_STORAGE_PROJECT_ID,
        bucketName: env.GCP_STORAGE_BUCKET_NAME,
        clientEmail: env.GCP_STORAGE_CLIENT_EMAIL,
        rawClientKey: env.GCP_STORAGE_CLIENT_KEY,
      }
    },
/*    cassandra: {
      keyspace: env.ASTRA_DB_KEYSPACE,
      cloud: {
        secureConnectBundlePath: './db/cassandra/secure-connect-kingboo.zip',
        username: env.ASTRA_DB_USERNAME,
        password: env.ASTRA_DB_PASSWORD,
      }
    },*/
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
