import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelRepository } from '../core/abstract/hotel.repository';
import { TopHotels } from '../core/interface/top-hotels';

@Injectable()
export class TopHotelsService {

  constructor(
    private readonly hotelRepository: HotelRepository,
  ) {
  }

  async getTopHotels(searchId?: string): Promise<TopHotels> {
    if (!searchId) {
      throw new BadRequestException(`Missing query param "search_id"`)
    }
    const { bestRate, bestLocation, cheapest, bestPriceRate } = await this.hotelRepository.findTopHotelsBySearchIdOrFail(searchId);
    return {
      cheapest,
      bestPriceRate: bestPriceRate.filter((h) => h.calculatedValues.priceRate > 0),
      bestRate,
      bestLocation,
    }
  }
}
