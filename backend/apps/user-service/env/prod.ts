import { AppConfig } from '../src/config/app.config';

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_DATA_COLLECTION_NOTIFICATIONS_QUEUE_NAME,
      },
    },
    searchRequestsResourceAddress: env.SEARCH_REQUESTS_RESOURCE_ADDRESS,
    topHotelsResourceAddress: env.TOP_HOTELS_RESOURCE_ADDRESS,
  });
