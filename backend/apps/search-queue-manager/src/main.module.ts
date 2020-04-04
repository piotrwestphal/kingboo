import { Module } from '@nestjs/common';
import { SearchRequestController } from './search-request.controller';
import { CoreModule } from './core/core.module';
import { AppModule } from './app/app.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from './environments';
import { MainConfigService } from './main-config.service';
import { MqModule } from './mq/mq.module';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    CoreModule,
    AppModule,
    ConfigModule.register(getEnvironments(), MainConfigService),
    MqModule,
    // FaunaClientModule.register(MainConfigService),
  ],
  controllers: [SearchRequestController, AppController],
  providers: [],
})
export class MainModule {
}
