import { Module } from '@nestjs/common';
import { CassandraService } from './cassandra.service';

@Module({
  providers: [CassandraService],
  exports: [CassandraService],
})
export class CassandraModule {}
