export abstract class RawSearchResultService {
  abstract finishCollecting(searchId: string): void;
}
