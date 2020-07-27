import { FirestoreClient } from '@kb/firestore';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { RawSearchResult } from '../core/model/RawSearchResult';
import { logger } from '../logger';
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper';
import { RawSearchResultDocument } from './raw-search-result/raw-search-result.document';

export class FirestoreRawSearchResultRepository extends RawSearchResultRepository {

  private readonly DAY = 24 * 60 * 60 * 1000;

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly rawSearchResultMapper: RawSearchResultMapper,
  ) {
    super();
  }

  async create(rawSearchResult: RawSearchResult): Promise<void> {
    const rawSearchResultDocument = this.rawSearchResultMapper.fromRawSearchResult(rawSearchResult);
    try {
      const doc = await this.firestoreClient.addToCollection(
        'raw-search-results', rawSearchResultDocument.docId, rawSearchResultDocument);
      const { docId, searchId, searchPlaceIdentifier, collectingTimeSec, hotelsCount } = doc.data();
      logger.info(`Created raw search result with doc id [${docId}]`);
      logger.debug(`Details of created raw search result`, {
        searchId,
        searchPlaceIdentifier,
        collectingTimeSec,
        hotelsCount,
      });
    } catch (err) {
      logger.error(`Error when adding raw search result with searchId [${rawSearchResult.searchId}] to collection`, err);
    }
  }

  async deleteOlderThanGivenDays(days: number): Promise<string[]> {
    const collectionRef = this.firestoreClient.getCollection<RawSearchResultDocument>('raw-search-results');
    const offset = new Date(Date.now() - days * this.DAY);  // x days ago
    const docsRef = await collectionRef.where('createdAt', '<', offset).get();
    if (docsRef.empty) {
      return [];
    } else {
      const batch = this.firestoreClient.getBatch();
      docsRef.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      logger.debug(`Deleted [${docsRef.size}] raw search results that were older than [${days}] days`);
      return docsRef.docs.map(v => v.id);
    }
  }
}
