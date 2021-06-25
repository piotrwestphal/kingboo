import { IndexedTopHotels } from '@kb/model'

export abstract class TopHotelsRepository {
  abstract findBySearchId(searchId: string, limit: number): Promise<IndexedTopHotels[]>
}
