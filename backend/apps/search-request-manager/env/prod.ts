import { MainConfig } from '../src/main.config';

export const prodConfig = (env: NodeJS.ProcessEnv): MainConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    db: {
      dbName: env.FAUNA_DB_NAME,
      secret: env.FAUNA_KINGBOO_DB_SECRET,
    },
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_CONSUMER_QUEUE,
      },
    },
    dataCollectorMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_DATA_COLLECTOR_CLIENT_QUEUE,
      },
    },
    userServiceMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_USER_SERVICE_CLIENT_QUEUE,
      },
    },
  });
