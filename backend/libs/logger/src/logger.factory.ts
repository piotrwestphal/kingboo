import { transports } from 'winston';
import HumioTransport from 'humio-winston';
import { CustomLoggerService } from './custom-logger.service';
import { LoggerConfig } from './logger.config';
import * as Transport from 'winston-transport';

export const createLogger = ({
                               logLevel,
                               appLabel,
                               logOutputFolder,
                               logCollectorToken,
                             }: LoggerConfig) => {
  const additionalTransports: Transport[] = [];
  additionalTransports.push(new transports.File({
    filename: `${logOutputFolder}/${appLabel}-error.log`,
    level: 'error',
  }));
  additionalTransports.push(new transports.File({
    filename: `${logOutputFolder}/${appLabel}-combined.log`,
    level: 'debug',
  }));
  if (logCollectorToken) {
    const humioTransport = new HumioTransport({
      ingestToken: logCollectorToken,
      tags: { app: appLabel },
    }) as unknown;
    additionalTransports.push(humioTransport as Transport);
  }
  return new CustomLoggerService({
    appLabel,
    logLevel,
    additionalTransports,
  });
};
