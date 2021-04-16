import { UserNotificationHandler } from '../core/abstract/user-notification.handler'
import { logger } from '../logger'

export class AppUserNotificationHandler extends UserNotificationHandler {

  constructor() {
    super()
  }

  async updateSearchRequestCache(searchId: string,
                                 timestamp: number): Promise<void> {
    logger.debug(`There is no any effect here until async communication with frontend happen :). ` +
      `Search id: [${searchId}], timestamp ${timestamp}`)
  }
}
