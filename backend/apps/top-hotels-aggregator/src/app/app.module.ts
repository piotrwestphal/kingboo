import { Module } from '@nestjs/common'
import { DataUpdatesConsumer } from './data-updates.consumer'
import { TopHotelsService } from './top-hotels.service'
import { AppConfigService } from '../config/app-config.service'
import { FirestoreModule } from '@kb/firestore'
import { ConfigModule } from '@kb/config'
import { getEnvironments } from '../config/environments'
import { logger } from '../logger'

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService, logger }),
    FirestoreModule.register({ configClass: AppConfigService }),
  ],
  controllers: [DataUpdatesConsumer],
  providers: [
    TopHotelsService,
  ],
})
export class AppModule {
}
