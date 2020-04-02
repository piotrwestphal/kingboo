import { DynamicModule, Global, Module } from '@nestjs/common';
import { CommonConfigService } from './common-config.service';
import { getConfigBasedOnEnv } from '@kb/config/config.retriever';
import { Environments } from '@kb/config/model/environments';
import { CommonConfig } from '@kb/config/model/common-config';
import { ConfigType } from '@kb/config/config.type';

@Global()
@Module({})
export class ConfigModule {
  static register<T extends CommonConfig, K extends CommonConfigService>(
    envs: Environments<T>,
    configServiceType: ConfigType<K>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: configServiceType,
          useFactory: (): K => {
            const configOptions = getConfigBasedOnEnv(process.env, envs);
            return new configServiceType(configOptions);
          },
        },
      ],
      exports: [configServiceType],
    };
  }
}
