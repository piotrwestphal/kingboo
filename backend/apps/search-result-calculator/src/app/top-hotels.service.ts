import { Injectable } from '@nestjs/common';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { TopHotelsDto } from '../core/interface/top-hotels.dto';

@Injectable()
export class TopHotelsService {

  constructor(
    private readonly hotelRepository: HotelRepository,
  ) {
  }

  async getTopHotels(searchId: string): Promise<TopHotelsDto> {
    const { bestRate, bestLocation, cheapest, bestPriceRate } = await this.hotelRepository.findTopHotelsBySearchId(searchId);
    return {
      cheapest,
      bestPriceRate: bestPriceRate.filter((h) => h.calculatedValues.priceRate > 0),
      bestRate,
      bestLocation,
    }
  }
}
