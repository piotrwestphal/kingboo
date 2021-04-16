import { FirestoreClient, FirestoreDocument } from '@kb/firestore'
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository'
import { RawSearchResult } from '../core/model/RawSearchResult'
import { logger } from '../logger'
import { RawSearchResultMapper } from './raw-search-result/raw-search-result.mapper'
import { RawSearchResultDocument } from './raw-search-result/raw-search-result.document'
import { Query, QuerySnapshot } from '@google-cloud/firestore'
import { LinksDocument } from './links/links.document'
import { LinksMapper } from './links/links.mapper'

export class FirestoreRawSearchResultRepository extends RawSearchResultRepository {

  private readonly HOUR = 60 * 60 * 1000
  private readonly RAW_SEARCH_RESULTS_COLLECTION = 'raw-search-results'
  private readonly LINKS_COLLECTION = 'hotel-links'
  private readonly DELETE_BATCH_SIZE = 10

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly linksMapper: LinksMapper,
    private readonly rawSearchResultMapper: RawSearchResultMapper,
  ) {
    super()
  }

  /**
   * Save raw search results (without links) and links to separate collections
   */
  async create(rawSearchResult: RawSearchResult): Promise<void> {
    const rawSearchResultDocument = this.rawSearchResultMapper.toDoc(rawSearchResult)
    const { docId: newDocId, createdAt, searchId } = rawSearchResultDocument
    const linksDocument = this.linksMapper.toDoc(newDocId, searchId, createdAt, rawSearchResult.hotels)
    try {
      const savedRawSearchResult = await this.firestoreClient.addToCollection(this.RAW_SEARCH_RESULTS_COLLECTION, rawSearchResultDocument)
      const { docId: resultsDocId, searchId, searchPlaceIdentifier, collectingTimeSec, hotelsCount } = savedRawSearchResult.data()
      logger.info(`Created raw search result with doc id [${resultsDocId}]`)
      logger.debug(`Details of created raw search result`, {
        searchId,
        searchPlaceIdentifier,
        collectingTimeSec,
        hotelsCount,
      })
      const savedLinks = await this.firestoreClient.addToCollection(this.LINKS_COLLECTION, linksDocument)
      const { docId: linksDocId, links } = savedLinks.data()
      logger.info(`Created links with id [${linksDocId}]. Links count: [${Object.keys(links).length}]`)
    } catch (err) {
      logger.error(`Error when adding raw search result with searchId [${rawSearchResult.searchId}] to collection`, err)
    }
  }

  async deleteOlderThanGivenHours(hours: number): Promise<string[]> {
    const pendingDeleteResults = this.deleteOlderThanGivenHoursFromCollection<RawSearchResultDocument>(this.RAW_SEARCH_RESULTS_COLLECTION, hours)
    const pendingDeleteLinks = this.deleteOlderThanGivenHoursFromCollection<LinksDocument>(this.LINKS_COLLECTION, hours)
    const [deletedResultIds] = await Promise.all([pendingDeleteResults, pendingDeleteLinks])
    return deletedResultIds
  }

  private async deleteOlderThanGivenHoursFromCollection<T extends FirestoreDocument>(collectionName: string, hours: number): Promise<string[]> {
    const collectionRef = this.firestoreClient.getCollection<T>(collectionName)
    const offset = new Date(Date.now() - hours * this.HOUR)  // x hours ago
    const oldDocsQuery = collectionRef.where('createdAt', '<', offset)
    return new Promise((res) => {
      this.deleteInBatch(collectionName, oldDocsQuery, this.DELETE_BATCH_SIZE, res, [])
    })
  }

  private async deleteInBatch(collectionName: string,
                              query: Query<FirestoreDocument>,
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
      .concat(currentlyDeletedIds)
    logger.debug(`Deleted [${snapshot.size}] items from [${collectionName}] collection`)
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this.deleteInBatch(collectionName, query, batchSize, resolve, deletedIds)
    })
  }

  async findBySearchId(searchId: string): Promise<{
    rawSearchResultDocuments: RawSearchResultDocument[],
    linksDocuments: LinksDocument[]
  }> {
    const rawSearchResultsSnapshotPending = this.getFromCollectionById<RawSearchResultDocument>(this.RAW_SEARCH_RESULTS_COLLECTION, searchId)
    const linksSnapshotPending = this.getFromCollectionById<LinksDocument>(this.LINKS_COLLECTION, searchId)
    const [rawSearchResultsSnapshot, linksSnapshot] = await Promise.all([rawSearchResultsSnapshotPending, linksSnapshotPending])
    return {
      rawSearchResultDocuments: rawSearchResultsSnapshot.docs.map(doc => doc.data()),
      linksDocuments: linksSnapshot.docs.map(doc => doc.data())
    }
  }

  private getFromCollectionById<T extends FirestoreDocument>(collectionName: string, searchId: string): Promise<QuerySnapshot<T>> {
    const collectionRef = this.firestoreClient.getCollection<T>(collectionName)
    return collectionRef.where('searchId', '==', searchId).get()
  }

}
