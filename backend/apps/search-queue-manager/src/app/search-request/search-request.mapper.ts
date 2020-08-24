import { SearchRequestDto } from '@kb/model';
import { SearchRequest } from '../../core/model/SearchRequest';

export class SearchRequestMapper {
  toDto(searchRequest: SearchRequest): SearchRequestDto {
    return {
      ...searchRequest,
      checkInDate: searchRequest.checkInDate.toISOString(),
      checkOutDate: searchRequest.checkOutDate.toISOString(),
      nextSearchScheduledAt: searchRequest.nextSearchScheduledAt.toISOString(),
    }
  }
}
