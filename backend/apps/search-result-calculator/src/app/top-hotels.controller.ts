import { Controller, Get, Query } from '@nestjs/common';
import { TopHotelsDto } from '@kb/model';
import { HotelsService } from './hotels/hotels.service';

@Controller('api/v1/top-hotels')
export class TopHotelsController {

  constructor(private readonly hotelsService: HotelsService) {
  }

  @Get()
  getTopHotels(@Query('search_id') searchId: string,
               @Query('collecting_started_at') collectingStartedAt: string,
               @Query('collecting_finished_at') collectingFinishedAt?: string): Promise<TopHotelsDto> {
    return this.hotelsService.getTopHotels(searchId, collectingStartedAt, collectingFinishedAt);
  }
}
