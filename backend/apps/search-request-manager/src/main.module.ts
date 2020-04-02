import { Module } from '@nestjs/common';
import { SearchRequestController } from './search-request.controller';
import { CoreModule } from './core/core.module';
import { AppModule } from './app/app.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from './config';
import { MainConfigService } from './main-config.service';

@Module({
  imports: [
    CoreModule,
    AppModule,
    ConfigModule.register(getEnvironments(), MainConfigService)],
  controllers: [SearchRequestController],
  providers: [],
})
export class MainModule {
}
