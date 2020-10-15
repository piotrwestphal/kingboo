export abstract class UserNotificationSender {
  abstract notifyAboutHotelsProcessingFinished(searchId: string): void;
}
