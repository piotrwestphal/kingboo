import { AppConfig } from '../src/config/app.config';

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    mongo: {
      address: env.MONGO_ADDRESS,
    },
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        noAck: false,
        prefetchCount: 1,
        queue: env.MQ_USER_NOTIFICATIONS_QUEUE_NAME,
        queueOptions: {
          arguments: {
            'x-message-ttl': parseInt(env.MQ_USER_NOTIFICATIONS_QUEUE_MESSAGE_TTL, 10),
          }
        }
      },
    },
    searchRequestsResourceAddress: env.SEARCH_REQUESTS_RESOURCE_ADDRESS,
  });
