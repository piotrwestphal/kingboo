export abstract class DataCollectionNotificationSender {
  abstract sendSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): void;

  abstract notifyAboutHotelsCollectionCompleted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void;
}
