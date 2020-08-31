export abstract class UserNotificationSender {
  abstract notifyAboutHotelsCollectionStarted(searchId: string): void;
}
