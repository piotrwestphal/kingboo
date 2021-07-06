import { DynamicModule, Module, Provider } from '@nestjs/common'
import { MongoConfigService } from '@kb/mongo/mongo-config.service'
import { MongoConfigType } from '@kb/mongo/mongo-config.type'
import { getConnectionToken, getModelToken, ModelDefinition } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Connection } from 'mongoose'

@Module({})
export class MongoModule {

  static registerPrimary<T extends MongoConfigService>({ configClass }: { configClass: MongoConfigType<T> },
                                                       modelDefinitions: ModelDefinition[]): DynamicModule {
    return this.register(
      configClass,
      modelDefinitions,
      (config) => config.mongoPrimaryAddress,
      'Primary')
  }

  static registerSecondary<T extends MongoConfigService>({ configClass }: { configClass: MongoConfigType<T> },
                                                         modelDefinitions: ModelDefinition[]): DynamicModule {
    return this.register(
      configClass,
      modelDefinitions,
      (config) => config.mongoSecondaryAddress,
      'Secondary')
  }

  private static register<T extends MongoConfigService>(configClass: MongoConfigType<T>,
                                                        modelDefinitions: ModelDefinition[],
                                                        uriProvider: (config: T) => string,
                                                        connectionName: string): DynamicModule {
    const modelProviders: Provider[] = modelDefinitions.map(modelDef => ({
      provide: getModelToken(modelDef.name),
      useFactory: (c: Connection) => c.model(modelDef.name, modelDef.schema, modelDef.collection),
      inject: [getConnectionToken(connectionName)],
    }))

    return {
      module: MongoModule,
      providers: [
        {
          provide: getConnectionToken(connectionName),
          useFactory: async (config: T): Promise<Connection> =>
            mongoose.createConnection(
              uriProvider(config),
              {
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
              }),
          inject: [configClass]
        },
        ...modelProviders,
      ],
      exports: [
        ...modelProviders,
      ],
    }
  }
}
