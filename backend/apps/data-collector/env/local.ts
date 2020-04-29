import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { AppConfig } from '../src/config/app.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const consumerQueueName = 'collecting-scenario';
const dataCollectionNotificationsQueue = 'data-collection-notifications';
const dataToProcessQueue = 'data-to-process';

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost', // separate multiple origins by comma
  saveRawResultInJson: true,
  takeScreenshotOnError: true,
  puppeteer: {
    headlessModeOff: true,
    executablePath: './node_modules/puppeteer/.local-chromium/mac-722234/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    slowMoMs: 0,
    devtoolsTurnedOn: false,
  },
  fauna: {
    dbName: 'dev',
    adminDb: {
      domain: 'localhost',
      scheme: 'http',
      port: 8443,
      secret: 'secret',
    },
  },
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
