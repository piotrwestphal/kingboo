import { MainConfig } from '../src/main.config';
import { retrieveRMQQueueOptions } from '@kb/rabbit';

const mqAddress = (env) => env.MQ_ADDRESS;
const consumerQueueName = (env) => env.MQ_CONSUMER_QUEUE;
const dataCollectorClientQueueName = (env) => env.MQ_DATA_COLLECTOR_CLIENT_QUEUE;
const userServiceClientQueueName = (env) => env.MQ_USER_SERVICE_CLIENT_QUEUE;

export const devConfig = (env: NodeJS.ProcessEnv): MainConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    db: {
      dbName: env.FAUNA_DB_NAME,
      faunaAdminDb: {
        domain: env.FAUNA_ADMIN_DB_DOMAIN,
        scheme: env.FAUNA_ADMIN_DB_SCHEME as 'http' | 'https',
        port: parseInt(env.FAUNA_ADMIN_DB_PORT, 10),
        secret: env.FAUNA_ADMIN_DB_SECRET,
      },
    },
    mqConsumer: {
      address: mqAddress(env),
      queueDefinition: {
        queue: consumerQueueName(env),
        queueOptions: retrieveRMQQueueOptions(consumerQueueName(env)),
      },
    },
    dataCollectorMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: dataCollectorClientQueueName(env),
        queueOptions: retrieveRMQQueueOptions(dataCollectorClientQueueName(env)),
      },
    },
    userServiceMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: userServiceClientQueueName(env),
        queueOptions: retrieveRMQQueueOptions(userServiceClientQueueName(env)),
      },
    },
  });
