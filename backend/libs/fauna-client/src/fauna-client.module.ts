import { DynamicModule, Module } from '@nestjs/common';
import { FaunaClient } from './fauna.client';
import { FaunaClientOptions } from '@kb/fauna-client/fauna-client.options';
import { CommonConfigService } from '@kb/config';
import { Client } from 'faunadb';
import { createClient, createClientForDevPurposes } from '@kb/fauna-client/utils/create-client';

@Module({
  providers: [FaunaClient],
  exports: [FaunaClient],
})
export class FaunaClientModule {
  static register(clientOpts: FaunaClientOptions[]): DynamicModule {
    const faunaClientProviders = clientOpts.map((opt) => {
      return {
        provide: opt.clientName,
        useFactory: async (configService: CommonConfigService): Promise<Client> => {
          return configService.env === 'prod'
            ? createClient(configService.getFaunaSecretOrFail(opt.dbName))
            : createClientForDevPurposes(configService.getFaunaAdminDbOptionsOrFail(), opt.dbName);
        },
        inject: [CommonConfigService],
      };
    });
    return {
      module: FaunaClientModule,
      providers: [
        ...faunaClientProviders,
      ],
      exports: [
        ...faunaClientProviders.map(v => v.provide),
      ],
    };
  }
}
