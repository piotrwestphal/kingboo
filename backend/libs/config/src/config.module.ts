import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { getConfigBasedOnEnv } from '@kb/config/config.provider';
import { Environments } from '@kb/config/model/environments';
import { CommonConfig } from '@kb/config/model/common-config';
import { ConfigType } from '@kb/config/config.type';
import { CommonLoggerService } from '@kb/logger';

@Global()
@Module({})
export class ConfigModule {
  static register<T extends CommonConfig, K extends ConfigService<T>>(
    envs: Environments<T>,
    { configClass, logger }: { configClass: ConfigType<T, K>, logger: CommonLoggerService }): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: configClass,
          useFactory: (): K => {
            const configOptions = getConfigBasedOnEnv(process.env, envs);
            return new configClass(configOptions, logger);
          },
        },
      ],
      exports: [configClass],
    };
  }
}
