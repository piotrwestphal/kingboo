import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CommonLoggerService } from '@kb/logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  constructor(
    private readonly logger: CommonLoggerService,
  ) {
  }

  catch(exception: any, host: ArgumentsHost): any {
    this.logger.error('Global catch error. Argument hosts: ', host.getArgs());
    this.logger.error('Global catch error. Exception: ', exception);
  }
}
