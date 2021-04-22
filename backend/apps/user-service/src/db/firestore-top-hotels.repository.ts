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

  async findBySearchIds(searchIds: string[]): Promise<TopHotelsDto[]> {
    const collectionRef = this.firestoreClient.getCollection<TopHotelsDocument>(this.TOP_HOTELS_COLLECTION)
    const toFind = searchIds.map(v => collectionRef.doc(v))
    const snapshots = await this.firestoreClient.getAll(toFind)
    return snapshots.map(v => this.topHotelsDocumentMapper.fromDoc(v.data()))
  }
}
