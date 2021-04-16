import { UserNotificationHandler } from '../core/abstract/user-notification.handler'
import { SearchRequestDto } from '@kb/model'

export class AppUserNotificationHandler extends UserNotificationHandler {

  constructor() {
    super()
  }

  updateSearchRequest(searchId: string, searchRequestDto: SearchRequestDto): Promise<void> {
    // TODO: implement
    return Promise.resolve(undefined);
  }

  deleteSearchRequest(searchId: string): Promise<void> {
    // TODO: implement
    return Promise.resolve(undefined);
  }

  updateTopHotels(searchId: string): Promise<void> {
    // TODO: implement
    return Promise.resolve(undefined);
  }
}
