import { Module } from '@nestjs/common';
import { SearchRequestController } from './search-request.controller';
import { CoreModule } from './core/core.module';
import { AppModule } from './app/app.module';
import { ConfigModule } from '@kb/config';

@Module({
  imports: [CoreModule, AppModule, ConfigModule],
  controllers: [SearchRequestController],
  providers: [],
})
export class MainModule {
}
