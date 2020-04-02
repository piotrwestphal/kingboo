import { MainConfig } from '../src/main.config';

export const prodConfig = (env: NodeJS.ProcessEnv): MainConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    db: {
      secret: env.FAUNA_KINGBOO_DB_SECRET,
    },
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_CONSUMER_QUEUE,
      },
    },
    mqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_CLIENT_QUEUE,
        prefetchCount: 1,
        noAck: false,
        queueOptions: {
          arguments: {
            'x-message-ttl': parseInt(env.RMQ_CLIENT_TTL_MS, 10),
          },
        },
      },
    },
  });
