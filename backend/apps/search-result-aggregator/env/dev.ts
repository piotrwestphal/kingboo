import { AppConfig } from '../src/config/app.config'
import { retrieveRMQQueueOptions } from '@kb/rabbit'

const mqAddress = (env) => env.MQ_ADDRESS
const consumerQueueName = (env) => env.MQ_DATA_UPDATES_QUEUE_NAME
const userNotificationsQueue = (env) => env.MQ_USER_NOTIFICATIONS_QUEUE_NAME

export const devConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    topHotelsSelectLimit: parseInt(env.TOP_HOTELS_SELECT_LIMIT, 10),
    firestore: {
      projectId: env.FIRESTORE_PROJECT_ID,
      emulator: {
        host: env.FIRESTORE_EMULATOR_HOST,
        port: parseInt(env.FIRESTORE_EMULATOR_PORT, 10),
      },
    },
    mongo: {
      primaryAddress: env.MONGO_RO_PRIMARY_ADDRESS,
    },
    mqConsumer: {
      address: mqAddress(env),
      queueDefinition: {
        queue: consumerQueueName(env),
        noAck: false,
        queueOptions: retrieveRMQQueueOptions(consumerQueueName(env)),
      },
    },
    userNotificationsMqClient: {
      address: mqAddress(env),
      queueDefinition: {
        queue: userNotificationsQueue(env),
        queueOptions: retrieveRMQQueueOptions(userNotificationsQueue(env)),
      },
    },
  })
