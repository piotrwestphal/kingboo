import { BadRequestException, Injectable } from '@nestjs/common';
import { HotelRepository } from '../../core/abstract/hotel.repository';
import { SimpleHotelsDto } from '@kb/model/hotel/simple-hotels.dto';
import { TopHotelsDto } from '@kb/model';

@Injectable()
export class HotelsService {

  constructor(
    private readonly hotelRepository: HotelRepository,
  ) {
  }

  async getTopHotels(searchId?: string, collectingStartedAt?: string, collectingFinishedAt?: string): Promise<TopHotelsDto> {
    this.validateMandatoryParams(searchId, collectingStartedAt)
    const { bestRate, bestLocation, cheapest, bestPriceRate } = await this.hotelRepository.findTopHotelsBySearchIdOrFail(
      searchId, collectingStartedAt, collectingFinishedAt);
    return {
      cheapest,
      bestPriceRate: bestPriceRate.filter((h) => h.calculatedValues.priceRate > 0),
      bestRate,
      bestLocation,
    }
  }

  async getHotels(searchId?: string, collectingStartedAt?: string, collectingFinishedAt?: string): Promise<SimpleHotelsDto> {
    this.validateMandatoryParams(searchId, collectingStartedAt)
    const simpleHotels = await this.hotelRepository.findAllBySearchId(
      searchId, collectingStartedAt, collectingFinishedAt);
    return {
      simpleHotels,
    }
  }

  private validateMandatoryParams(searchId?: string, collectingStartedAt?: string): void {
    if (!searchId) {
      throw new BadRequestException(`Missing query param "search_id"`)
    }
    if (!collectingStartedAt) {
      throw new BadRequestException(`Missing query param "collecting_started_at"`)
    }
  }
}
