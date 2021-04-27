import { createLogger } from '@kb/logger'

export const logger = createLogger({
  appLabel: process.env.APP_LABEL || 'US',
  logLevel: process.env.LOG_LEVEL || 'debug',
  logOutputFolder: 'output',
})
