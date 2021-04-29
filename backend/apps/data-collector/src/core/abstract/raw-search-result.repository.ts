import { RawSearchResult } from '../model/RawSearchResult'

export abstract class RawSearchResultRepository {
  abstract find(searchId: string): Promise<RawSearchResult>;
  abstract create(rawSearchResult: RawSearchResult): Promise<void>;
  abstract deleteOlderThanGivenHours(hours: number): Promise<string[]>;
}
