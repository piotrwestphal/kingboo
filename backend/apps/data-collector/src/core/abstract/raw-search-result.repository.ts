import { RawSearchResult } from '../model/RawSearchResult'

export abstract class RawSearchResultRepository {
  abstract create(rawSearchResult: RawSearchResult): Promise<void>;
}
