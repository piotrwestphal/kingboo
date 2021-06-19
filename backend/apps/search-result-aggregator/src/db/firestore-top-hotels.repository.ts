import { TopHotelsDocumentMapper } from './top-hotels/top-hotels-document.mapper'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { FirestoreClient } from '@kb/firestore'
import { logger } from '../logger'
import { TopHotelsDocument } from './top-hotels/top-hotels.document'
import { TopHotelsDto } from '@kb/model'

export class FirestoreTopHotelsRepository extends TopHotelsRepository {

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly mapper: TopHotelsDocumentMapper,
  ) {
    super()
  }

  async create(searchId: string,
               collectingStartedAt: string,
               collectingFinishedAt: string,
               topHotels: TopHotelsDto): Promise<void> {
    const topHotelsDoc = this.mapper.toDoc(searchId, collectingStartedAt, collectingFinishedAt, topHotels)
    try {
      const savedTopHotels = await this.firestoreClient.addToCollection(this.COLLECTION_NAME, topHotelsDoc)
      const { docId, bestLocation, bestPriceRate, bestRate, cheapest } = savedTopHotels.data()
      logger.info(`Created [${this.COLLECTION_NAME}] with doc id [${docId}]`)
      logger.debug(`Details of created [${this.COLLECTION_NAME}]`, {
        searchId,
        collectingStartedAt,
        collectingFinishedAt,
        topHotelsCount: {
          cheapest: cheapest.length,
          bestPriceRate: bestPriceRate.length,
          bestRate: bestRate.length,
          bestLocation: bestLocation.length,
        },
      })
    } catch (err) {
      logger.error(`Error when adding [${this.COLLECTION_NAME}] with searchId [${searchId}] to collection`, err)
    }
  }

  async delete(searchId: string): Promise<void> {
    const toDelete = await this.firestoreClient
      .getCollection<TopHotelsDocument>(this.COLLECTION_NAME)
      .where('searchId', '==', searchId)
      .get()
    if (toDelete.empty) {
      logger.warn(`There is no [${this.COLLECTION_NAME}] with searchId [${searchId}]`)
    } else {
      try {
        const results = await Promise.all(toDelete.docs.map(doc => doc.ref.delete()))
        logger.info(`Deleted [${this.COLLECTION_NAME}] with searchId [${searchId}]. Result count [${results.length}]`)
      } catch (err) {
        logger.error(`Failed to delete [${this.COLLECTION_NAME}] with searchId [${searchId}]`)
      }
    }
  }
}
