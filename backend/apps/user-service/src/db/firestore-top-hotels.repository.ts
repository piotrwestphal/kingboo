import { FirestoreClient } from '@kb/firestore'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { TopHotelsDocumentMapper } from './top-hotels-document.mapper'
import { IndexedTopHotels } from '@kb/model'
import { TopHotelsDocument } from './top-hotels.document'

export class FirestoreTopHotelsRepository extends TopHotelsRepository {

  private readonly TOP_HOTELS_COLLECTION = 'top-hotels'

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly topHotelsDocumentMapper: TopHotelsDocumentMapper,
  ) {
    super()
  }

  async findBySearchId(searchId: string, limit: number): Promise<IndexedTopHotels[]> {
    const collectionRef = this.firestoreClient.getCollection<TopHotelsDocument>(this.TOP_HOTELS_COLLECTION)
    const result = await collectionRef.where('searchId', '==', searchId).limit(limit).get()

    return result.docs
      .map(snapshot => snapshot.data())
      .map(doc => this.topHotelsDocumentMapper.fromDoc(doc))
  }
}
