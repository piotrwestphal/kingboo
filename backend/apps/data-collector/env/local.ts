import { retrieveRMQQueueOptions } from '@kb/rabbit'
import { AppConfig } from '../src/config/app.config'

const mqAddress = 'amqp://dev:dev@localhost:5672'
const consumerQueueName = 'collecting-scenario'
const dataCollectionNotificationsQueue = 'data-collection-notifications'
const dataToProcessQueue = 'data-to-process'

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost:3000', // separate multiple origins by comma
  puppeteer: {
    headlessModeOff: true,
    enableStylesOnResultsPage: false,
    executablePath: './node_modules/puppeteer/.local-chromium/mac-856583/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    slowMoMs: 0,
    devtoolsTurnedOn: false,
  },
  storage: {
    local: {
      outputFolderPath: 'output'
    }
  },
/*  cassandra: { TODO: remove all definitions related to cassandra
    keyspace: 'kingboo',
    local: {
      contactPoint: 'localhost',
      localDataCenter: 'datacenter1',
    }
  },*/
  mqConsumer: {
    address: mqAddress,
    queueDefinition: {
      queue: consumerQueueName,
      noAck: false,
      prefetchCount: 1,
      queueOptions: retrieveRMQQueueOptions(consumerQueueName),
    },
  },
  dataCollectionNotificationsMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: dataCollectionNotificationsQueue,
      queueOptions: retrieveRMQQueueOptions(dataCollectionNotificationsQueue),
    },
  },
  dataToProcessMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: dataToProcessQueue,
      queueOptions: retrieveRMQQueueOptions(dataToProcessQueue),
    },
  },
}
