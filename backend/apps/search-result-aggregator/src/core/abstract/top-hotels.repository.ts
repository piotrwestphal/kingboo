import { IndexedTopHotels } from '@kb/model'

export abstract class TopHotelsRepository {

  COLLECTION_NAME = 'top-hotels'

  abstract create(searchId: string,
                  collectingStartedAt: string,
                  collectingFinishedAt: string,
                  indexedTopHotelsDtos: IndexedTopHotels[]): Promise<void>

  abstract delete(searchId: string): Promise<void>
}
