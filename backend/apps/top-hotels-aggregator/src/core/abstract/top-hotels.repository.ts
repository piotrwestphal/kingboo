import { TopHotels } from '../interface/top-hotels'

export abstract class TopHotelsRepository {
  abstract create(searchId: string,
                  collectingStartedAt: string,
                  collectingFinishedAt: string,
                  topHotels: TopHotels): Promise<void>

  abstract delete(searchId: string): Promise<void>
}
