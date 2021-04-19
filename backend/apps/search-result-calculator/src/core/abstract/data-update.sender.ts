export abstract class DataUpdateSender {
  abstract notifyAboutHotelsProcessingFinished(searchId: string,
                                               collectingStartedAt: string,
                                               collectingFinishedAt: string): void;
}
