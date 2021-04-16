import { Module } from '@nestjs/common'
import { AppConfigService } from '../config/app-config.service'
import { MongoModule } from '@kb/mongo'
import { CacheSchema } from './cache/cache.schema'

const TopHotelsCacheSchemaKey = 'topHotelsCache'

@Module({
  imports: [
    MongoModule.register({ configClass: AppConfigService }, [
      { name: TopHotelsCacheSchemaKey, schema: CacheSchema },
    ]),
  ],
  providers: [
  ],
  exports: [
  ],
})
export class DbModule {
}
