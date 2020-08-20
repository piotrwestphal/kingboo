import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { HotelDto } from '../core/interface/hotel.dto';

@Controller('api/v1/hotels')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(@Query('search_id') searchId: string): Promise<HotelDto[]> {
    return this.appService.getHotels(searchId);
  }
}
