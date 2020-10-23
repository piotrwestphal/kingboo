export abstract class UserNotificationSender {
  abstract notifyAboutHotelsProcessingFinished(searchId: string,
                                               collectingStartedAt: string,
                                               collectingFinishedAt: string): void;
}
