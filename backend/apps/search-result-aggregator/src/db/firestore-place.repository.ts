import { FirestoreClient } from '@kb/firestore'
import { PlaceDocumentMapper } from './place/place-document.mapper'
import { PlaceRepository } from '../core/abstract/place.repository'
import { SimpleHotelDto } from '@kb/model'
import { logger } from '../logger'
import { TopHotelsDocument } from './top-hotels/top-hotels.document'

export class FirestorePlaceRepository extends PlaceRepository {

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly mapper: PlaceDocumentMapper,
  ) {
    super()
  }

  async create(searchId: string,
               collectingStartedAt: string,
               collectingFinishedAt: string,
               hotel: SimpleHotelDto): Promise<void> {
    const placeDoc = this.mapper.toDoc(searchId, collectingStartedAt, collectingFinishedAt, hotel)
    try {
      const savedPlace = await this.firestoreClient.addToCollection(this.COLLECTION_NAME, placeDoc)
      const { docId } = savedPlace.data()
      logger.info(`Created [${this.COLLECTION_NAME}] with doc id [${docId}]`)
      logger.debug(`Details of created [${this.COLLECTION_NAME}]`, {
        searchId,
        collectingStartedAt,
        collectingFinishedAt,
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
