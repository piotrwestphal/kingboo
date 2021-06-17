import { SimpleHotelDto } from '@kb/model'

export abstract class PlaceRepository {

  COLLECTION_NAME = 'place'

  abstract create(searchId: string,
                  collectingStartedAt: string,
                  collectingFinishedAt: string,
                  hotel: SimpleHotelDto): Promise<void>

  abstract delete(searchId: string): Promise<void>
}
