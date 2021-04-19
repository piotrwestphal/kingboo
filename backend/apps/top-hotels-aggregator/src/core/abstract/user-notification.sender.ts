export abstract class UserNotificationSender {
  abstract notifyAboutTopHotelsUpdate(searchId: string): void
}
