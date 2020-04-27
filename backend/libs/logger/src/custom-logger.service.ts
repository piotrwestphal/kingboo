import * as Winston from 'winston';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { LoggerService } from '@nestjs/common';

interface LoggerOptions {
  readonly appLabel: string;
  readonly logLevel: string;
  readonly additionalTransports: Transport[];
}

export class CustomLoggerService implements LoggerService {

  private readonly logger: Winston.Logger;

  constructor({
                appLabel,
                logLevel,
                additionalTransports,
              }: LoggerOptions) {
    this.logger = this.init(appLabel, logLevel, additionalTransports);
  }

  public debug(message: string, object?: any): void {
    this.logger.debug(this.concatWithMessageIfObjExist(message, object));
  }

  // For Nest logging purpose only
  public log(message: string, object?: any): void {
    this.logger.info(this.concatWithMessageIfObjExist(message, object));
  }

  public info(message: string, ...meta: string[]): void {
    this.logger.info(message, ...meta);
  }

  public warn(message: string, ...meta: string[]): void {
    this.logger.warn(message, ...meta);
  }

  // Last param is for Nest logging purpose only
  public error(message: string, ...meta: string[]): void {
    this.logger.error(message, ...meta);
  }

  private concatWithMessageIfObjExist = (message: string, object?: any): string => {
    if (object) {
      return `${message} ${JSON.stringify(object)}`;
    }
    return message;
  };

  private customPrint = (serviceLabel: string) => winston.format.printf(info =>
    `[${serviceLabel}][${info.level}][${new Date().toISOString()}]: ${info.message}`);

  private init(appLabel: string,
               logLevel: string,
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
