import { retrieveRMQQueueOptions } from '@kb/rabbit';
import { AppConfig } from '../src/config/app.config';

const mqAddress = 'amqp://dev:dev@localhost:5672';
const consumerQueueName = 'data-to-process';
const dataUpdatesQueue = 'data-updates';

export const localConfig: AppConfig = {
  nodeEnv: 'local',
  port: 8080,
  corsOrigins: 'http://localhost:3000', // separate multiple origins by comma
  saveResultAsJson: true,
  hotelsWithoutUpdateRetentionHours: 7,
  mongo: {
    address: 'mongodb://127.0.0.1:27017/dev',
  },
  mqConsumer: {
    address: mqAddress,
    queueDefinition: {
      queue: consumerQueueName,
      noAck: false,
      prefetchCount: 5,
      queueOptions: retrieveRMQQueueOptions(consumerQueueName),
    },
  },
  dataUpdatesMqClient: {
    address: mqAddress,
    queueDefinition: {
      queue: dataUpdatesQueue,
      queueOptions: retrieveRMQQueueOptions(dataUpdatesQueue),
    },
  },
};
