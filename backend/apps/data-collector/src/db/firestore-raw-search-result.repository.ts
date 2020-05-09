import { FirestoreClient } from '@kb/firestore';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { RawSearchResult } from '../core/model/RawSearchResult';
import { logger } from '../logger';
import { RawSearchResultMapper } from './raw-search-result.mapper';

export class FirestoreRawSearchResultRepository extends RawSearchResultRepository {

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly rawSearchResultMapper: RawSearchResultMapper,
  ) {
    super();
  }

  async create(rawSearchResult: RawSearchResult): Promise<void> {
    const rawSearchResultDocument = this.rawSearchResultMapper.fromRawSearchResult(rawSearchResult);
    try {
      const doc = await this.firestoreClient.addToCollection('raw-search-results', rawSearchResultDocument);
      const { searchId, searchPlaceIdentifier, collectingTimeSec, hotelsCount } = doc.data();
      logger.info(`Created raw search result with search id [${searchId}]`);
      logger.debug(`Details of created raw search result`, { searchPlaceIdentifier, collectingTimeSec, hotelsCount });
    } catch (err) {
      logger.error(`Error when adding raw search result with searchId [${rawSearchResult.searchId}] to collection`, err);
    }
  }
}
