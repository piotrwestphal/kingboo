import { DynamicModule, Module } from '@nestjs/common'
import { CassandraConfigType } from '@kb/cassandra/cassandra-config.type'
import { CassandraConfigService } from '@kb/cassandra/cassandra-config.service'
import { createCassandra, createCassandraForDevPurposes } from '@kb/cassandra/create-cassandra'
import { CassandraClient } from '@kb/cassandra/cassandra.client'
import { CommonLoggerService } from '@kb/logger'
import { connectToCassandra } from '@kb/cassandra/cassandra.connector'

@Module({})
export class CassandraModule {
  static register<T extends CassandraConfigService>(
    { configClass, logger }: { configClass: CassandraConfigType<T>, logger: CommonLoggerService }): DynamicModule {
    const cassandraClientProvider = {
      provide: CassandraClient,
      useFactory: async (configService: T): Promise<CassandraClient> => {
        const cassandra = configService.env === 'prod'
          ? createCassandra(configService.cassandraKeyspace, configService.cassandraCloud)
          : createCassandraForDevPurposes(configService.cassandraKeyspace, configService.cassandraLocal)
        const connectedCassandra = await connectToCassandra(cassandra, logger)
        return new CassandraClient(connectedCassandra)
      },
      inject: [configClass],
    }
    return {
      module: CassandraModule,
      providers: [
        cassandraClientProvider,
      ],
      exports: [
        CassandraClient,
      ],
    }
  }
}
