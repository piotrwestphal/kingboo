import { Module } from '@nestjs/common';
import { HotelDataAggregatorService } from './hotel-data-aggregator.service';
import { SearchResultService } from './search-result.service';
import { DbModule } from '../db/db.module';

@Module({
    imports: [
        DbModule,
    ],
    providers: [
        HotelDataAggregatorService,
        SearchResultService,
    ],
    exports: [
        HotelDataAggregatorService,
        SearchResultService,
    ],
})
export class SearchResultModule {
}
