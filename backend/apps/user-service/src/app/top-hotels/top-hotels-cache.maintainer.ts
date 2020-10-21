import { HotelsClient } from '../../core/abstract/hotels.client';
import { TopHotelsCacheRepository } from '../../core/abstract/top-hotels-cache.repository';
import { logger } from '../../logger';
import { CacheData } from '../../core/model/CacheData';
import { CollectingTimesData } from '../../core/interface/collecting-times.data';
import { Injectable } from '@nestjs/common';
import { TopHotelsDto } from '@kb/model';

@Injectable()
export class TopHotelsCacheMaintainer {
  constructor(
    private readonly hotelsClient: HotelsClient,
    private readonly topHotelsCacheRepository: TopHotelsCacheRepository,
  ) {
  }

  async updateCache(searchId: string,
                    { collectingStartedAt, collectingFinishedAt }: CollectingTimesData,
                    timestamp: number): Promise<void> {
    const found = await this.topHotelsCacheRepository.find(searchId)
    if (found) {
      if (this.isMessageOld(found, timestamp)) {
        logger.debug(`Message timestamp [${new Date(timestamp).toISOString()}] is earlier than the ` +
          `cache update time [${found.updatedAt.toISOString()}]. The message has expired`)
      } else {
        await this.topHotelsCacheRepository.delete(searchId)
        logger.debug(`Deleted top hotels cache with search id [${searchId}] due to obsolescence`)
      }
    } else {
      const topHotelsDto = await this.hotelsClient.getTopHotels(searchId, collectingStartedAt, collectingFinishedAt)
      const topHotelsCache = CacheData.create({
        searchId,
        collectingStartedAt,
        collectingFinishedAt,
        data: topHotelsDto
      })
      await this.topHotelsCacheRepository.create(topHotelsCache)
      logger.debug(`Created top hotels cache with search id [${searchId}]`)
    }
  }

  private isMessageOld = (found: CacheData<TopHotelsDto>, timestamp: number) =>
    found.updatedAt.getTime() > timestamp
}
