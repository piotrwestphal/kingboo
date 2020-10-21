import { SearchRequestDto } from '@kb/model';
import { CacheRepository } from './cache.repository';

export abstract class SearchRequestCacheRepository extends CacheRepository<SearchRequestDto> {
}
