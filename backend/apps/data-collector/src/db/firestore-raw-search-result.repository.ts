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
    const doc = await this.firestoreClient.addToCollection('raw-search-results', rawSearchResultDocument);
    const data = doc.data();
    logger.info('Created message', data);
  }
}
