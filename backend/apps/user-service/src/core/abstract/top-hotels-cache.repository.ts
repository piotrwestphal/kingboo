import { TopHotelsDto } from '@kb/model';
import { CacheRepository } from './cache.repository';

export abstract class TopHotelsCacheRepository extends CacheRepository<TopHotelsDto> {
}
