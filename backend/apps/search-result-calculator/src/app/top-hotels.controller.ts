import { Controller, Get, Query } from '@nestjs/common';
import { TopHotelsService } from './top-hotels.service';
import { TopHotelsDto } from '../core/interface/top-hotels.dto';

@Controller('api/v1/top-hotels')
export class TopHotelsController {

  constructor(private readonly appService: TopHotelsService) {
  }

  @Get()
  getTopHotels(@Query('search_id') searchId: string): Promise<TopHotelsDto> {
    return this.appService.getTopHotels(searchId);
  }
}
