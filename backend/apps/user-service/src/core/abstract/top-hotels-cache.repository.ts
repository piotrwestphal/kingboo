import { TopHotelsCache } from '../model/TopHotelsCache';

export abstract class TopHotelsCacheRepository {
  abstract find(searchId: string): Promise<TopHotelsCache>
  abstract create(topHotelsCache: TopHotelsCache): Promise<TopHotelsCache>
  abstract delete(searchId: string): Promise<boolean>
}
