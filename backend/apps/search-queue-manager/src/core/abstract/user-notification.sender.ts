export abstract class UserNotificationSender {
  abstract notifyAboutCreatedUserSearchRequest(userId: string, searchId: string): void;

  abstract notifyAboutCreatedCyclicSearchRequest(searchId: string): void;

  abstract notifyAboutDeletedCyclicSearchRequest(searchId: string): void;

  abstract notifyAboutFinishedCollecting(searchId: string,
                                         collectingStartedAt: string,
                                         collectingFinishedAt: string): void;
}
