import { Module } from '@nestjs/common';
import { ScrapModule } from './scrap/scrap.module';
import { AppController } from './app.controller';

@Module({
    imports: [
        ScrapModule,
    ],
    controllers: [AppController],
})
export class AppModule {
}
