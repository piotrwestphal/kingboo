export abstract class DataCollectionNotificationSender {
  abstract sendSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): void;
}
