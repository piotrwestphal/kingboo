import { Controller, Get, Query } from '@nestjs/common';
import { HotelsService } from './hotels/hotels.service';
import { SimpleHotelsDto } from '@kb/model/hotel/simple-hotels.dto';

@Controller('api/v1/hotels')
export class HotelsController {

  constructor(private readonly hotelsService: HotelsService) {
  }

  @Get()
  getHotels(@Query('search_id') searchId: string,
            @Query('collecting_started_at') collectingStartedAt: string,
            @Query('collecting_finished_at') collectingFinishedAt?: string): Promise<SimpleHotelsDto> {
    return this.hotelsService.getHotels(searchId, collectingStartedAt, collectingFinishedAt);
  }
}
