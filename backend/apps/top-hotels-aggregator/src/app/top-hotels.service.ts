import { Injectable } from '@nestjs/common'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { HotelRepository } from '../core/abstract/hotel.repository'
import { AppConfigService } from '../config/app-config.service'
import { SortedByOption } from '../core/interface/sorted-by-option'
import { logger } from '../logger'
import { TopHotels } from '../core/interface/top-hotels'

const sortBy = {
  bestPriceRate: [
    { value: 'calculatedValues.priceRate', order: -1 },
    { value: 'latestValues.price', order: 1 }
  ] as SortedByOption[],
  cheapest: [
    { value: 'latestValues.price', order: 1 }
  ] as SortedByOption[],
  bestRate: [
    { value: 'latestValues.rate', order: -1 },
    { value: 'latestValues.price', order: 1 },
  ] as SortedByOption[],
  bestLocation: [
    { value: 'latestValues.distanceFromCenterOrderIndex', order: 1 },
  ] as SortedByOption[]
}

@Injectable()
export class TopHotelsService {
  constructor(
    private readonly config: AppConfigService,
    private readonly hotelRepository: HotelRepository,
    private readonly topHotelsRepository: TopHotelsRepository,
  ) {
  }

  async updateTopHotels(searchId: string, collectingStartedAt: string, collectingFinishedAt: string): Promise<void> {
    try {
      const topHotels = await this.getTopHotels(searchId, collectingStartedAt, collectingFinishedAt)
      await this.topHotelsRepository.create(searchId, collectingStartedAt, collectingFinishedAt, topHotels)
    } catch (err) {
      logger.error(`Error when updating [top-hotels] searchId [${searchId}] ` +
        `collectingStartedAt [${collectingStartedAt}] collectingFinishedAt [${collectingFinishedAt}]`)
    }
  }

  async deleteTopHotels(searchId: string): Promise<void> {
    return this.topHotelsRepository.delete(searchId)
  }

  private async getTopHotels(searchId: string, collectingStartedAt: string, collectingFinishedAt: string): Promise<TopHotels> {
    const limit = this.config.topHotelsSelectLimit
    const pendingResults = [
      sortBy.bestPriceRate,
      sortBy.cheapest,
      sortBy.bestRate,
      sortBy.bestLocation
    ].map((sortedBy) => this.hotelRepository.findTopHotels(searchId, collectingStartedAt, collectingFinishedAt, sortedBy, limit))
    try {
      const [
        bestPriceRate,
        cheapest,
        bestRate,
        bestLocation,
      ] = await Promise.all(pendingResults)
      return {
        bestPriceRate,
        cheapest,
        bestRate,
        bestLocation
      }
    } catch (err) {
      logger.error(`Error when searching for [hotel] - searchId [${searchId}] ` +
        `collectingStartedAt [${collectingStartedAt}] collectingFinishedAt [${collectingFinishedAt}]`, err)
      return err
    }
  }
}
