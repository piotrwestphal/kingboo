import { RawSearchResult } from '../model/RawSearchResult'

export abstract class RawSearchResultRepository {
  abstract find(searchId: string, createdAt: Date): Promise<RawSearchResult>;

  abstract create(rawSearchResult: RawSearchResult): Promise<void>;

  abstract deleteAll(): Promise<void>;
}
