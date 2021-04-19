import { AppConfig } from '../src/config/app.config'
import { retrieveRMQQueueOptions } from '@kb/rabbit'

const mqAddress = (env) => env.MQ_ADDRESS
const consumerQueueName = (env) => env.MQ_USER_NOTIFICATIONS_QUEUE_NAME

export const devConfig = (env: NodeJS.ProcessEnv): AppConfig =>
  ({
    nodeEnv: env.NODE_ENV as 'dev',
    port: env.PORT ? parseInt(env.PORT, 10) : 8080,
    corsOrigins: env.CORS_ORIGINS,
    firestore: {
      projectId: env.FIRESTORE_PROJECT_ID,
      emulator: {
        host: env.FIRESTORE_EMULATOR_HOST,
        port: parseInt(env.FIRESTORE_EMULATOR_PORT, 10),
      },
    },
    mqConsumer: {
      address: mqAddress(env),
      queueDefinition: {
        queue: consumerQueueName(env),
        noAck: false,
        prefetchCount: 1,
        queueOptions: retrieveRMQQueueOptions(consumerQueueName(env)),
      },
    },
    searchRequestsResourceAddress: env.SEARCH_REQUESTS_RESOURCE_ADDRESS,
  })
