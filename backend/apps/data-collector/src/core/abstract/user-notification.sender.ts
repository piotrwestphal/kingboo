export abstract class UserNotificationSender {
  abstract notifyAboutHotelsCollectionStarted(searchId: string, scrapStartedAt: Date, scrapFinishedAt: Date): void;
  abstract notifyAboutHotelsCollectionCompleted(searchId: string, scrapStartedAt: Date, scrapFinishedAt: Date): void;
}
