import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';

@Module({
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}
