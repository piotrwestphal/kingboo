import { CacheInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TopHotelsService } from './top-hotels/top-hotels.service';
import { TopHotelsDto } from '@kb/model';

@Controller('api/v1/top-hotels')
@UseInterceptors(CacheInterceptor)
export class TopHotelsController {

  constructor(private readonly topHotelsService: TopHotelsService) {
  }

  @Get()
  getTopHotels(@Query('search_id') searchId?: string): Promise<TopHotelsDto> {
    return this.topHotelsService.getTopHotels(searchId);
  }
}
