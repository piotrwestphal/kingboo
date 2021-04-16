export abstract class UserNotificationHandler {
  abstract updateSearchRequestCache(searchId: string,
                                    timestamp: number): Promise<void>

}
