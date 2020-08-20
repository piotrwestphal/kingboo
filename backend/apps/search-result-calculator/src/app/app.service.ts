import { Injectable } from '@nestjs/common';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { HotelDto } from '../core/interface/hotel.dto';

@Injectable()
export class AppService {

  constructor(
    private readonly hotelRepository: HotelRepository,
  ) {
  }

  getHotels(searchId: string): Promise<HotelDto[]> {
    return this.hotelRepository.findBySearchId(searchId);
  }
}
