import { TopHotelsDocumentMapper } from './top-hotels/top-hotels-document.mapper'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { FirestoreClient } from '@kb/firestore'
import { logger } from '../logger'
import { TopHotelsDocument } from './top-hotels/top-hotels.document'
import { IndexedTopHotels } from '@kb/model'

export class FirestoreTopHotelsRepository extends TopHotelsRepository {

  private readonly DELETE_BATCH_SIZE = 10

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly mapper: TopHotelsDocumentMapper,
  ) {
    super()
  }

  async create(searchId: string,
               collectingStartedAt: string,
               collectingFinishedAt: string,
               indexedTopHotelsDtos: IndexedTopHotels[]): Promise<void> {
    const topHotelsDoc = indexedTopHotelsDtos.map(indexedTopHotels =>
      this.mapper.toDoc(searchId, collectingStartedAt, collectingFinishedAt, indexedTopHotels))
    try {
      const batch = this.firestoreClient.getBatch()
      const collectionRef = this.firestoreClient.getCollection<TopHotelsDocument>(this.COLLECTION_NAME)
      topHotelsDoc.forEach(doc => batch.create(collectionRef.doc(doc.docId), doc))
      await batch.commit()
      logger.info(`Created [${topHotelsDoc.length}] [${this.COLLECTION_NAME}] for search id [${searchId}]`)
    } catch (err) {
      logger.error(`Error when adding [${this.COLLECTION_NAME}] with searchId [${searchId}] to collection`, err)
    }
  }

  async delete(searchId: string): Promise<void> {
    const query = this.firestoreClient
      .getCollection<TopHotelsDocument>(this.COLLECTION_NAME)
      .where('searchId', '==', searchId)

    try {
      const deletedDocIds = await new Promise((res: (docIds: string[]) => void) => {
        this.firestoreClient.deleteInBatch(query, this.DELETE_BATCH_SIZE, res, [])
      })
      if (deletedDocIds.length) {
        logger.info(`Deleted [${deletedDocIds.length}] [${this.COLLECTION_NAME}] with searchId [${searchId}]`)
      } else {
        logger.warn(`There is no [${this.COLLECTION_NAME}] with searchId [${searchId}]`)
      }
    } catch (err) {
      logger.error(`Failed to delete [${this.COLLECTION_NAME}] with searchId [${searchId}]`, err)
    }
  }
}
