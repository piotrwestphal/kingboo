export abstract class UserNotificationSender {
  abstract notifyAboutCreatedSearchRequest(userId: string, searchId: string): void;
  abstract notifyAboutUpdatedSearchRequest(userId: string, searchId: string): void;
  abstract notifyAboutDeletedSearchRequest(userId: string, searchId: string): void;
}
