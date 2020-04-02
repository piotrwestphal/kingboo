import { Module } from '@nestjs/common';
import { RabbitClient } from './rabbit.client';

@Module({
  providers: [RabbitClient],
  exports: [RabbitClient],
})
export class RabbitModule {}
