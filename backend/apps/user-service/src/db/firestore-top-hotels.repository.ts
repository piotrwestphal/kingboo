import { FirestoreClient } from '@kb/firestore'
import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { TopHotelsDocumentMapper } from './top-hotels-document.mapper'
import { TopHotelsDto } from '@kb/model'
import { TopHotelsDocument } from './top-hotels.document'

export class FirestoreTopHotelsRepository extends TopHotelsRepository {

  private readonly TOP_HOTELS_COLLECTION = 'top-hotels'

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly topHotelsDocumentMapper: TopHotelsDocumentMapper,
  ) {
    super()
  }

  async find(searchId: string): Promise<TopHotelsDto | null> {
    const collectionRef = this.firestoreClient.getCollection<TopHotelsDocument>(this.TOP_HOTELS_COLLECTION)
    const snapshot = await collectionRef.doc(searchId).get()
    return snapshot.exists
      ? this.topHotelsDocumentMapper.fromDoc(snapshot.data())
      : null
  }
}
