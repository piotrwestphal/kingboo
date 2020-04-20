import { Module } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { FaunaClient, FaunaClientModule } from '@kb/fauna-client';
import { FaunaRawSearchResultRepository } from './fauna-raw-search-result.repository';
import { RawSearchResultMapper } from './raw-search-result.mapper';

@Module({
  imports: [
    FaunaClientModule.register({ configClass: AppConfigService }),
  ],
  providers: [
    {
      provide: RawSearchResultRepository,
      useFactory: (faunaClient: FaunaClient) => {
        const mapper = new RawSearchResultMapper();
        return new FaunaRawSearchResultRepository(faunaClient, mapper);
      },
      inject: [FaunaClient],
    },
  ],
  exports: [
    RawSearchResultRepository,
  ],
})
export class DbModule {
}
