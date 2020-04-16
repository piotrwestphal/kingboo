export abstract class DataCollectionNotificationSender {
  abstract sendSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): void;
  abstract sendHotelsCollectionCompleted(searchId: string, collectingTimeSec: number): void;
}
