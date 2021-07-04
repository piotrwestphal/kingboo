import { createLogger } from '@kb/logger'

export const logger = createLogger({
  logLevel: process.env.LOG_LEVEL || 'debug',
  logOutputFolder: process.env.LOG_OUTPUT_FOLDER || 'output',
})
