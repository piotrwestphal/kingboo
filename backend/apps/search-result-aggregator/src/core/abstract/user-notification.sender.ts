export abstract class UserNotificationSender {
  abstract notifyAboutTopHotelsUpdate(searchId: string): void
  abstract notifyAboutPlaceUpdate(searchId: string): void
}
