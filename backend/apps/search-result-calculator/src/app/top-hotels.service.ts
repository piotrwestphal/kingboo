import { Injectable } from '@nestjs/common';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { TopHotels } from '../core/interface/top-hotels';

@Injectable()
export class TopHotelsService {

  constructor(
    private readonly hotelRepository: HotelRepository,
  ) {
  }

  async getTopHotels(searchId: string): Promise<TopHotels> {
    const { bestRate, bestLocation, cheapest, bestPriceRate } = await this.hotelRepository.findTopHotelsBySearchId(searchId);
    return {
      cheapest,
      bestPriceRate: bestPriceRate.filter((h) => h.calculatedValues.priceRate > 0),
      bestRate,
      bestLocation,
    }
  }
}
