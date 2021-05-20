import { DynamicModule, Module, OnModuleDestroy } from '@nestjs/common'
import { CassandraConfigService } from './cassandra-config.service'
import { createCassandra, createCassandraForDevPurposes } from './create-cassandra'
import { CassandraWrapper } from './cassandra-wrapper'
import { connectToCassandra } from './cassandra.connector'
import { Client, mapping } from 'cassandra-driver'
import { CassandraModuleOptions } from './cassandra-module-options'
import { CassandraMapperOption } from './cassandra-mapper-option'
import { CassandraClient } from './cassandra.client'
import Mapper = mapping.Mapper
import ModelOptions = mapping.ModelOptions
import UnderscoreCqlToCamelCaseMappings = mapping.UnderscoreCqlToCamelCaseMappings

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
                                                      mapperOptions
                                                    }: CassandraModuleOptions<T>): DynamicModule {
    const cassandraWrapperProvider = {
      provide: CassandraWrapper,
      useFactory: async (configService: T): Promise<CassandraWrapper> => {
        const cassandra = configService.env === 'prod'
          ? createCassandra(configService.cassandraKeyspace, configService.cassandraCloud)
          : createCassandraForDevPurposes(configService.cassandraKeyspace, configService.cassandraLocal)
        const connectedCassandra = await connectToCassandra(cassandra, configService.logger)
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
