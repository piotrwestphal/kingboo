import { TopHotelsRepository } from '../core/abstract/top-hotels.repository'
import { FirestoreClient } from '@kb/firestore'
import { TopHotelsDocumentMapper } from './top-hotels-document.mapper'

export class FirestoreTopHotelsRepository extends TopHotelsRepository {

  private readonly TOP_HOTELS_COLLECTION = 'top-hotels'

  constructor(
    private readonly firestoreClient: FirestoreClient,
    private readonly topHotelsDocumentMapper: TopHotelsDocumentMapper,
  ) {
    super()
  }

  async find(searchId: string): Promise<any> {
    return Promise.resolve(undefined);
  }
}
