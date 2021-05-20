import { AppConfig } from '../src/config/app.config';

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    hotelsWithoutUpdateRetentionHours: parseInt(env.HOTELS_WITHOUT_UPDATE_RETENTION_HOURS, 10),
    storage: {
      remote: {
        projectId: env.GCP_STORAGE_PROJECT_ID,
        bucketName: env.GCP_STORAGE_BUCKET_NAME,
        clientEmail: env.GCP_STORAGE_CLIENT_EMAIL,
        rawClientKey: env.GCP_STORAGE_CLIENT_KEY,
      }
    },
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
    dataUpdatesMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_DATA_UPDATES_QUEUE_NAME,
      },
    },
  });
