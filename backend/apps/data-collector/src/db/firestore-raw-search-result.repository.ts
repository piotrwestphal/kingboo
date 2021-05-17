import { FirestoreClient, FirestoreDocument } from '@kb/firestore'
import { logger } from '../logger'
import { Query } from '@google-cloud/firestore'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FirestoreRawSearchResultRepository {

  private readonly HOUR = 60 * 60 * 1000
  private readonly RAW_SEARCH_RESULTS_COLLECTION = 'raw-search-results'
  private readonly LINKS_COLLECTION = 'hotel-links'
  private readonly DELETE_BATCH_SIZE = 10

  constructor(
    private readonly firestoreClient: FirestoreClient,
  ) {
  }

  async deleteOlderThanGivenHours(hours: number): Promise<string[]> {
    const pendingDeleteResults = this.deleteOlderThanGivenHoursFromCollection(this.RAW_SEARCH_RESULTS_COLLECTION, hours)
    const pendingDeleteLinks = this.deleteOlderThanGivenHoursFromCollection(this.LINKS_COLLECTION, hours)
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
}
