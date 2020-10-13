export abstract class UserNotificationSender {
  abstract notifyAboutHotelsProcessingFinished(searchId: string,
                                               hotelIds: string[],
                                               messageProcessingTime: number,
                                               collectedAt: string): void;
}
