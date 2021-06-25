import { Injectable } from '@nestjs/common'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { HotelRepository } from '../core/abstract/hotel.repository'
import { AppConfigService } from '../config/app-config.service'
import { SortedByOption } from '../core/interface/sorted-by-option'
import { logger } from '../logger'
import { UserNotificationSender } from '../core/abstract/user-notification.sender'
import { PlaceRepository } from '../core/abstract/place.repository'
import { CollectingScenarioType } from '@kb/model'
import { TopHotelsMapper } from './top-hotels.mapper'
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
export class HotelService {
  constructor(
    private readonly config: AppConfigService,
    private readonly hotelRepository: HotelRepository,
    private readonly placeRepository: PlaceRepository,
    private readonly userNotificationSender: UserNotificationSender,
    private readonly topHotelsMapper: TopHotelsMapper,
    private readonly topHotelsRepository: TopHotelsRepository,
  ) {
  }

  async updateHotel(searchId: string, collectingStartedAt: string, collectingFinishedAt: string): Promise<void> {
    try {
      const simpleHotelDto = await this.hotelRepository.findHotel(searchId, collectingStartedAt, collectingFinishedAt)
      await this.placeRepository.create(searchId, collectingStartedAt, collectingFinishedAt, simpleHotelDto)
      this.userNotificationSender.notifyAboutPlaceUpdate(searchId)
    } catch (err) {
      logger.error(`Error when updating [${this.placeRepository.COLLECTION_NAME}] searchId [${searchId}] ` +
        `collectingStartedAt [${collectingStartedAt}] collectingFinishedAt [${collectingFinishedAt}]`)
    }
  }

  async updateTopHotels(searchId: string, collectingStartedAt: string, collectingFinishedAt: string): Promise<void> {
    try {
      const topHotels = await this.findTopHotels(searchId, collectingStartedAt, collectingFinishedAt)
      const indexedTopHotels = this.topHotelsMapper.toIndexedTopHotels(topHotels)
      await this.topHotelsRepository.delete(searchId)
      await this.topHotelsRepository.create(searchId, collectingStartedAt, collectingFinishedAt, indexedTopHotels)
      this.userNotificationSender.notifyAboutTopHotelsUpdate(searchId)
    } catch (err) {
      logger.error(`Error when updating [${this.topHotelsRepository.COLLECTION_NAME}] searchId [${searchId}] ` +
        `collectingStartedAt [${collectingStartedAt}] collectingFinishedAt [${collectingFinishedAt}]`)
    }
  }

  async deleteHotels(searchId: string, scenarioType: CollectingScenarioType): Promise<void> {
    switch (scenarioType)  {
      case CollectingScenarioType.COLLECT_PLACE: {
        await this.placeRepository.delete(searchId)
        break
      }
      case CollectingScenarioType.COLLECT_HOTELS: {
        await this.topHotelsRepository.delete(searchId)
        break
      }
    }
  }

  private async findTopHotels(searchId: string, collectingStartedAt: string, collectingFinishedAt: string): Promise<TopHotels> {
    const limit = this.config.topHotelsSelectLimit
    const pendingResults = [
      sortBy.bestPriceRate,
      sortBy.cheapest,
      sortBy.bestRate,
      sortBy.bestLocation
    ].map((sortedBy) => this.hotelRepository.findHotels(searchId, collectingStartedAt, collectingFinishedAt, sortedBy, limit))
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
