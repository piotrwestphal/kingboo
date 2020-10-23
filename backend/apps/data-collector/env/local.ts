import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { AppConfig } from '../src/config/app.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const consumerQueueName = 'collecting-scenario';
const dataCollectionNotificationsQueue = 'data-collection-notifications';
const dataToProcessQueue = 'data-to-process';

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost:3000', // separate multiple origins by comma
  saveRawResultAsJson: true,
  rawSearchResultRetentionHours: 720,
  scrapActivitiesWithoutUpdateRetentionDays: 7,
  takeScreenshotOnError: true,
  puppeteer: {
    headlessModeOff: true,
    enableStylesOnResultsPage: false,
    executablePath: './node_modules/puppeteer/.local-chromium/mac-782078/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    slowMoMs: 0,
    devtoolsTurnedOn: false,
  },
  firestore: {
    projectId: 'dev',
    emulator: {
      host: 'localhost',
      port: 8555,
    },
  },
  mongo: {
    address: 'mongodb://127.0.0.1:27017/dev'
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
};
