import { ConfigOptions } from '@kb/config';

export const config = (env: NodeJS.ProcessEnv): ConfigOptions =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: parseInt(env.PORT, 10),
    corsOrigins: env.CORS_ORIGINS,
    db: {
      faunaDbSecrets: {
        kingboo: env.FAUNA_KINGBOO_DB_SECRET,
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
