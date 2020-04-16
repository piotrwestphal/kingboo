import { DynamicModule, Module } from '@nestjs/common';
import { MongoConfigService } from '@kb/mongo/mongo-config.service';
import { MongoConfigType } from '@kb/mongo/mongo-config.type';
import { ModelDefinition, MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({})
export class MongoModule {
  static register<T extends MongoConfigService>({ configClass }: { configClass: MongoConfigType<T> },
                                                modelDefinitions: ModelDefinition[]): DynamicModule {

    const mongooseModels = MongooseModule.forFeature(modelDefinitions);
    return {
      module: MongoModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async (config: T) => ({
            uri: config.mongoAddress,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as MongooseModuleOptions),
          inject: [configClass],
        }),
        mongooseModels,
      ],
      exports: [
        mongooseModels,
      ],
    };
  }
}
