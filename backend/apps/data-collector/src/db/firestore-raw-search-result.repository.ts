import { FirestoreClient } from '@kb/firestore';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { RawSearchResult } from '../core/model/RawSearchResult';
import { logger } from '../logger';
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper';
import { RawSearchResultDocument } from './raw-search-result/raw-search-result.document';
import { Query } from '@google-cloud/firestore';

export class FirestoreRawSearchResultRepository extends RawSearchResultRepository {

  private readonly HOUR = 60 * 60 * 1000;

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

  async deleteOlderThanGivenHours(hours: number): Promise<string[]> {
    const collectionRef = this.firestoreClient.getCollection<RawSearchResultDocument>('raw-search-results');
    const batchSize = 10;
    const offset = new Date(Date.now() - hours * this.HOUR);  // x hours ago
    const oldDocsQuery = await collectionRef.where('createdAt', '<', offset)
    return new Promise((res) => {
      this.deleteInBatch(oldDocsQuery, batchSize, res, [])
    })
  }

  private async deleteInBatch(query: Query<RawSearchResultDocument>,
                              batchSize: number,
                              resolve: (docIds: string[]) => void,
                              currentlyDeletedIds: string[]): Promise<string[]> {
    const snapshot = await query.limit(batchSize).get()
    if (snapshot.empty) {
      resolve(currentlyDeletedIds)
      return
    }
    const batch = this.firestoreClient.getBatch()
    snapshot.docs.forEach(doc => batch.delete(doc.ref))
    await batch.commit()
    const deletedIds = snapshot.docs
      .map((v) => v.id)
      .concat(currentlyDeletedIds);
    logger.debug(`Deleted [${snapshot.size}] raw search results`)
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this.deleteInBatch(query, batchSize, resolve, deletedIds)
    })
  }
}
