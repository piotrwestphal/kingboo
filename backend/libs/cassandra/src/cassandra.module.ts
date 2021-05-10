import { DynamicModule, Module, OnModuleDestroy } from '@nestjs/common'
import { CassandraConfigService } from '@kb/cassandra/cassandra-config.service'
import { createCassandra, createCassandraForDevPurposes } from '@kb/cassandra/create-cassandra'
import { CassandraWrapper } from '@kb/cassandra/cassandra-wrapper'
import { connectToCassandra } from '@kb/cassandra/cassandra.connector'
import { Client, mapping } from 'cassandra-driver'
import { CassandraModuleOptions } from '@kb/cassandra/cassandra-module-options'
import { CassandraMapperOption } from '@kb/cassandra/cassandra-mapper-option'
import Mapper = mapping.Mapper
import ModelOptions = mapping.ModelOptions
import UnderscoreCqlToCamelCaseMappings = mapping.UnderscoreCqlToCamelCaseMappings
import { CassandraClient } from '@kb/cassandra/cassandra.client'

const createBaseMapper = (cassandraClient: Client, cassandraMapperOptions: CassandraMapperOption[]): Mapper => {
  const modelOptions = cassandraMapperOptions.reduce((prev, curr) => (({
    ...prev,
    [curr.model]: {
      tables: [curr.table],
      mappings: new UnderscoreCqlToCamelCaseMappings() // converting `column_name` -> `columnName`
    }
  })), {} as { [key: string]: ModelOptions })
  return new Mapper(cassandraClient, {
    models: { ...modelOptions }
  })
}

@Module({})
export class CassandraModule implements OnModuleDestroy {

  constructor(
    private readonly cassandraWrapper: CassandraWrapper,
  ) {
  }

  static register<T extends CassandraConfigService>({
                                                      configClass,
                                                      logger,
                                                      mapperOptions
                                                    }: CassandraModuleOptions<T>): DynamicModule {
    const cassandraWrapperProvider = {
      provide: CassandraWrapper,
      useFactory: async (configService: T): Promise<CassandraWrapper> => {
        const cassandra = configService.env === 'prod'
          ? createCassandra(configService.cassandraKeyspace, configService.cassandraCloud)
          : createCassandraForDevPurposes(configService.cassandraKeyspace, configService.cassandraLocal)
        const connectedCassandra = await connectToCassandra(cassandra, logger)
        const cassandraBaseMapper = createBaseMapper(connectedCassandra, mapperOptions)
        const cassandraClient = new CassandraClient(connectedCassandra)
        return new CassandraWrapper(cassandraBaseMapper, cassandraClient)
      },
      inject: [configClass],
    }
    return {
      module: CassandraModule,
      providers: [
        cassandraWrapperProvider,
      ],
      exports: [
        CassandraWrapper,
      ],
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.cassandraWrapper.client.shutdown()
  }
}
