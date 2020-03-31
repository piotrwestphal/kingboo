import { Module } from '@nestjs/common';
import { SearchRequestRepository } from './interface/search-request.repository';
import { DbModule } from '../db/db.module';
import { SearchRequestSender } from './interface/search-request.sender';
import { MqModule } from '../mq/mq.module';

@Module({
  imports: [DbModule, MqModule],
})
export class CoreModule {
  constructor(
    private readonly searchRequestRepository: SearchRequestRepository,
    private readonly searchRequestSender: SearchRequestSender,
  ) {
    console.log({dupa1: searchRequestRepository});
    console.log({dupa2: searchRequestSender});
  }
}
