import { CollectingTimesData } from '../interface/collecting-times.data';

export abstract class UserNotificationHandler {
  abstract updateSearchRequestCache(searchId: string,
                                    timestamp: number): Promise<void>

  abstract updateTopHotelsCache(searchId: string,
                                collectingTimes: CollectingTimesData,
                                timestamp: number): Promise<void>
}
