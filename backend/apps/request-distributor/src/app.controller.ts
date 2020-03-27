import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('send')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post()
  send(@Body() payload: any): any {
    this.appService.sendNotification(payload);
    return payload;
  }
}
