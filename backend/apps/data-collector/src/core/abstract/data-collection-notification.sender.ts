export abstract class DataCollectionNotificationSender {
  abstract sendSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): void;

  abstract notifyAboutHotelsCollectionStarted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void;

  abstract notifyAboutHotelsCollectionCompleted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void;
}
