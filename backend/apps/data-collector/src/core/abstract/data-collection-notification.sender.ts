import { SearchPlaceIdentifier } from '../interface/search-place-identifier'

export abstract class DataCollectionNotificationSender {
  abstract sendSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: SearchPlaceIdentifier): void;

  abstract notifyAboutHotelsCollectionCompleted(searchId: string, scrapingStartedAt: Date, scrapingFinishedAt: Date): void;
}
