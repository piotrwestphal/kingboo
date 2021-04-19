import { retrieveRMQQueueOptions } from '@kb/rabbit'
import { AppConfig } from '../src/config/app.config'

const mqAddress = 'amqp://dev:dev@localhost:5672'
const consumerQueueName = 'user-notifications'

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost:3000', // separate multiple origins by comma
  firestore: {
    projectId: 'dev',
    emulator: {
      host: 'localhost',
      port: 8555,
    },
  },
  mqConsumer: {
    address: mqAddress,
    queueDefinition: {
      queue: consumerQueueName,
      noAck: false,
      prefetchCount: 1,
      queueOptions: retrieveRMQQueueOptions(consumerQueueName),
    },
  },
  searchRequestsResourceAddress: 'http://localhost:38081',
}
