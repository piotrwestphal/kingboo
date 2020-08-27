import { CacheInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { HotelsService } from './hotels/hotels.service';
import { SimpleHotelsDto } from '@kb/model/hotel/simple-hotels.dto';

@Controller('api/v1/hotels')
@UseInterceptors(CacheInterceptor)
export class HotelsController {

  constructor(private readonly hotelsService: HotelsService) {
  }

  @Get()
  getHotels(@Query('search_id') searchId?: string): Promise<SimpleHotelsDto> {
    return this.hotelsService.getHotels(searchId);
  }
}
