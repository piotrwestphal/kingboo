import { AppConfig } from '../src/config/app.config'

export const prodConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'prod',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    topHotelsSelectLimit: parseInt(env.TOP_HOTELS_SELECT_LIMIT, 10),
    firestore: {
      projectId: env.FIRESTORE_PROJECT_ID,
      clientEmail: env.FIRESTORE_CLIENT_EMAIL,
      // fix for difference in setting env variable in app engine and github actions
      clientKey: env.FIRESTORE_CLIENT_KEY.replace(/\\n/g, '\n')
    },
    mongo: {
      address: env.MONGO_ADDRESS,
    },
    mqConsumer: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        noAck: false,
        queue: env.MQ_DATA_UPDATES_QUEUE_NAME,
      },
    },
    userNotificationsMqClient: {
      address: env.MQ_ADDRESS,
      queueDefinition: {
        queue: env.MQ_USER_NOTIFICATIONS_QUEUE_NAME,
        queueOptions: {
          arguments: {
            'x-message-ttl': parseInt(env.MQ_USER_NOTIFICATIONS_QUEUE_MESSAGE_TTL, 10),
          }
        }
      },
    },
  })
