import { Body, Controller, Post } from '@nestjs/common';
import { SearchRequestSender } from './core/interface/search-request.sender';

@Controller('send')
export class SearchRequestController {

  constructor(
    private readonly searchRequestSender: SearchRequestSender,
  ) {
  }

  @Post()
  send(@Body() payload: any): any {
    this.searchRequestSender.send(payload);
    return payload;
  }
}
