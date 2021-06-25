import { createLogger } from '@kb/logger'

export const logger = createLogger({
  logLevel: process.env.LOG_LEVEL || 'debug',
  logOutputFolder: 'output',
})
