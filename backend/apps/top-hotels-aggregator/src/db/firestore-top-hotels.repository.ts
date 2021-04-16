import { TopHotelsDocumentMapper } from './top-hotels/top-hotels-document.mapper'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { FirestoreClient } from '@kb/firestore'
import { TopHotels } from '../core/interface/top-hotels'
import { logger } from '../logger'
import { TopHotelsDocument } from './top-hotels/top-hotels.document'

export class FirestoreTopHotelsRepository extends TopHotelsRepository {

  private readonly TOP_HOTELS_COLLECTION = 'top-hotels'

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly mapper: TopHotelsDocumentMapper,
  ) {
    super()
  }

  async create(searchId: string,
               collectingStartedAt: string,
               collectingFinishedAt: string,
               topHotels: TopHotels): Promise<void> {
    const topHotelsDoc = this.mapper.toDoc(searchId, collectingStartedAt, collectingFinishedAt, topHotels)
    try {
      const savedRawSearchResult = await this.firestoreClient.addToCollection(this.TOP_HOTELS_COLLECTION, topHotelsDoc)
      const { docId, bestLocation, bestPriceRate, bestRate, cheapest } = savedRawSearchResult.data()
      logger.info(`Created [${this.TOP_HOTELS_COLLECTION}] with doc id [${docId}]`)
      logger.debug(`Details of created [${this.TOP_HOTELS_COLLECTION}]`, {
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
      logger.error(`Error when adding [${this.TOP_HOTELS_COLLECTION}] with searchId [${searchId}] to collection`, err)
    }
  }

  async delete(searchId: string): Promise<void> {
    const toDelete = await this.firestoreClient
      .getCollection<TopHotelsDocument>(this.TOP_HOTELS_COLLECTION)
      .where('searchId', '==', searchId)
      .get()
    if (toDelete.empty) {
      logger.warn(`There is no [${this.TOP_HOTELS_COLLECTION}] with searchId [${searchId}]`)
    } else {
      try {
        const results = await Promise.all(toDelete.docs.map(doc => doc.ref.delete()))
        logger.info(`Deleted [${this.TOP_HOTELS_COLLECTION}] with searchId [${searchId}]. Result count [${results.length}]`)
      } catch (err) {
        logger.error(`Failed to delete [${this.TOP_HOTELS_COLLECTION}] with searchId [${searchId}]`)
      }
    }
  }
}
