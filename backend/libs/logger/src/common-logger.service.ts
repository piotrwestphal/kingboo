import * as Winston from 'winston';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { LoggerService } from '@nestjs/common';

interface LoggerOptions {
  readonly logLevel: string;
  readonly appLabel: string;
  readonly additionalTransports: Transport[];
}

export class CommonLoggerService implements LoggerService {

  private readonly logger: Winston.Logger;

  constructor({
                logLevel,
                appLabel,
                additionalTransports,
              }: LoggerOptions) {
    this.logger = this.init(logLevel, appLabel, additionalTransports);
  }

  public debug(message: string, object?: any): void {
    this.logger.debug(this.concatWithMessageIfObjExist(message, object));
  }

  // For Nest logging purpose only
  public log(message: string, object?: any): void {
    this.info(message, object);
  }

  public info(message: string, object?: any): void {
    this.logger.info(this.concatWithMessageIfObjExist(message, object));
  }

  public warn(message: string, object?: any): void {
    this.logger.warn(this.concatWithMessageIfObjExist(message, object));
  }

  // Last param is for Nest logging purpose only
  public error(message: string, err?: any): void {
    if (err) {
      this.logger.error(`${message} ${err}`);
    } else {
      this.logger.error(message);
    }
  }

  private concatWithMessageIfObjExist = (message: string, object?: any): string => {
    if (object) {
      return `${message} ${JSON.stringify(object)}`;
    }
    return message;
  };

  private customPrint = (appLabel: string) => winston.format.printf(info =>
    `${new Date().toISOString()} [${info.level.toUpperCase()}][${appLabel}] ${info.message}`);

  private init(logLevel: string,
               appLabel: string,
               additionalTransports: Transport[]): Winston.Logger {
    return winston.createLogger({
      level: logLevel,
      format: winston.format.combine(this.customPrint(appLabel)),
      transports: [
        new winston.transports.Console(),
        ...additionalTransports,
      ],
    });
  }
}
