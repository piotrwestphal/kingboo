import * as Winston from 'winston'
import { CommonLoggerService } from './common-logger.service'
import { LoggerConfig } from './logger.config'
import * as DailyRotateFile from 'winston-daily-rotate-file'

export const createLogger = ({
                               logLevel,
                               logOutputFolder,
                             }: LoggerConfig) => {
  const additionalTransports: Winston.transport[] = []
  additionalTransports.push(new DailyRotateFile({
    dirname: `${logOutputFolder}/logs`,
    filename: '%DATE%.log',
    level: logLevel,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '21d',
  }))
  return new CommonLoggerService({
    logLevel,
    additionalTransports,
  })
}
