import { AppConfig } from '../src/config/app.config';

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    saveResultInJson: env.SAVE_RESULT_IN_JSON === 'true',
    fauna: {
      secret: env.FAUNA_DB_SECRET,
    },
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_CONSUMER_QUEUE_NAME,
      },
    },
    userNotificationsMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_USER_NOTIFICATIONS_QUEUE_NAME,
        queueOptions: {
          arguments: {
            'x-message-ttl': parseInt(env.MQ_USER_NOTIFICATIONS_QUEUE_MESSAGE_TTL, 10),
          },
        },
      },
    },
  });
