import { transports } from 'winston';
import { CommonLoggerService } from './common-logger.service';
import { LoggerConfig } from './logger.config';
import { FileTransportInstance } from 'winston/lib/winston/transports'

export const createLogger = ({
                               logLevel,
                               logOutputFolder,
                             }: LoggerConfig) => {
  const additionalTransports: FileTransportInstance[] = [];
  additionalTransports.push(new transports.File({
    filename: `${logOutputFolder}/output.log`,
    level: 'debug',
  }));
  return new CommonLoggerService({
    logLevel,
    additionalTransports,
  });
};
