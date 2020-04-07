import { DynamicModule, Module } from '@nestjs/common';
import { FaunaClient } from './fauna.client';
import { createClient, createClientForDevPurposes } from '@kb/fauna-client/utils/create-client';
import { FaunaClientConfigService, FaunaClientConfigType } from '@kb/fauna-client';

@Module({
  providers: [FaunaClient],
  exports: [FaunaClient],
})
export class FaunaClientModule {
  static register<T extends FaunaClientConfigService>({configClass}: {configClass: FaunaClientConfigType<T>}): DynamicModule {
    const faunaClientProvider = {
      provide: FaunaClient,
      useFactory: async (config: T): Promise<FaunaClient> => {
        const nativeClient = config.env === 'prod'
          ? createClient(config.faunaSecret)
          : await createClientForDevPurposes(config.faunaAdminDbOptions, config.faunaDbName);
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
