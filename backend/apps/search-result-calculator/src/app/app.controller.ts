import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller()
export class AppController {
  constructor(private readonly appService: HotelService) {}

  @Get()
  getHello(): string {
    return null;
  }
}
