import { DynamicModule, Module } from '@nestjs/common';
import { FaunaClient } from './fauna.client';
import { createClient, createClientForDevPurposes } from '@kb/fauna-client/utils/create-client';
import { FaunaClientConfigService, FaunaClientConfigType } from '@kb/fauna-client';

@Module({})
export class FaunaClientModule {
  static register<T extends FaunaClientConfigService>({configClass}: {configClass: FaunaClientConfigType<T>}): DynamicModule {
    const faunaClientProvider = {
      provide: FaunaClient,
      useFactory: async (configService: T): Promise<FaunaClient> => {
        const nativeClient = configService.env === 'prod'
          ? createClient(configService.faunaSecret)
          : await createClientForDevPurposes(configService.faunaAdminDbOptions, configService.faunaDbName);
        return new FaunaClient(nativeClient);
      },
      inject: [configClass],
    };
    return {
      module: FaunaClientModule,
      providers: [
        faunaClientProvider,
      ],
      exports: [
        FaunaClient,
      ],
    };
  }
}
