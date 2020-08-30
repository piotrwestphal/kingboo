import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelRepository } from '../../core/abstract/hotel.repository';
import { SimpleHotelsDto } from '@kb/model/hotel/simple-hotels.dto';

@Injectable()
export class HotelsService {

  constructor(
    private readonly hotelRepository: HotelRepository,
  ) {
  }

  async getHotels(searchId?: string): Promise<SimpleHotelsDto> {
    if (!searchId) {
      throw new BadRequestException(`Missing query param "search_id"`)
    }
    const simpleHotels = await this.hotelRepository.findAllBySearchId(searchId);
    return {
      simpleHotels,
    }
  }
}
