import { UserNotificationHandler } from '../core/abstract/user-notification.handler';
import { HotelsClient } from '../core/abstract/hotels.client';
import { TopHotelsCacheRepository } from '../core/abstract/top-hotels-cache.repository';
import { logger } from '../logger';

export class AppUserNotificationHandler extends UserNotificationHandler {

  constructor(
    private readonly hotelsClient: HotelsClient,
    private readonly topHotelsCacheRepository: TopHotelsCacheRepository,
  ) {
    super()
  }

  async updateSearchRequestCache(searchId: string, timestamp: number): Promise<void> {
    return
  }

  // TODO: case when cache not found!
  async updateTopHotelsCache(searchId: string, timestamp: number): Promise<void> {
    const found = await this.topHotelsCacheRepository.find(searchId)
    if (found && found.updatedAt.getTime() > timestamp) {
      logger.debug(`Message timestamp [${timestamp}] is earlier than the cache update time ` +
        `[${found.updatedAt.getTime()}]. The message has expired`)
    } else {

    }
  }
}
