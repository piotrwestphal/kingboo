import { Body, Controller, Post } from '@nestjs/common';

@Controller('send')
export class SearchRequestController {
  @Post()
  send(@Body() payload: any): any {
    // this.appService.sendNotification(payload);
    return payload;
  }
}
