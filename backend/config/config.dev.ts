import { ConfigOptions } from '@kb/config';

export const config = (env: NodeJS.ProcessEnv): ConfigOptions =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: parseInt(env.PORT, 10),
    corsOrigins: env.CORS_ORIGINS,
    db: {
      faunaAdminDb: {
        domain: env.FAUNA_ADMIN_DB_DOMAIN,
        scheme: env.FAUNA_ADMIN_DB_SCHEME as 'http' | 'https',
        port: parseInt(env.FAUNA_ADMIN_DB_PORT, 10),
        secret: env.FAUNA_ADMIN_DB_SECRET,
      },
    },
    mq: {
      rmqAddress: env.RMQ_ADDRESS,
      rmqClientQueue: {
        queue: env.RMQ_CLIENT_QUEUE,
        queueOptions: {
          arguments: {
            'x-message-ttl': parseInt(env.RMQ_CLIENT_TTL_MS, 10),
          }
        }
      },
      rmqConsumerQueue: {
        queue: env.RMQ_CONSUMER_QUEUE,
      }
    }
  });
