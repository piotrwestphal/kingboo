import { UserNotificationHandler } from '../core/abstract/user-notification.handler';
import { CollectingTimesData } from '../core/interface/collecting-times.data';
import { TopHotelsCacheMaintainer } from './top-hotels/top-hotels-cache.maintainer';
import { logger } from '../logger';

export class AppUserNotificationHandler extends UserNotificationHandler {

  constructor(
    private readonly topHotelsCacheMaintainer: TopHotelsCacheMaintainer,
  ) {
    super()
  }

  async updateSearchRequestCache(searchId: string,
                                 collectingTimes: CollectingTimesData,
                                 timestamp: number): Promise<void> {
    logger.debug(`There is no any effect here until async communication with frontend happen :). ` +
      `Search id: [${searchId}], collecting times: [${collectingTimes}], timestamp ${timestamp}`)
  }

  updateTopHotelsCache(searchId: string,
                       collectingTimes: CollectingTimesData,
                       timestamp: number): Promise<void> {
    return this.topHotelsCacheMaintainer.updateCache(searchId, collectingTimes, timestamp)
  }
}
