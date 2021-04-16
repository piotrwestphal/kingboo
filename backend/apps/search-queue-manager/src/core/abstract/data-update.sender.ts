export abstract class DataUpdateSender {
  abstract notifyAboutDeletedSearchRequest(searchId: string): void
}
