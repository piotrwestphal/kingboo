import { SearchRequest } from '../model/SearchRequest';
import { CreateSearchRequest } from '../interface/create-search-request';

export abstract class SearchRequestService {
  abstract createSearchRequest(createSearchRequest: CreateSearchRequest): Promise<SearchRequest>;

  abstract updateSearchPlaceIdentifier(searchId: string, searchPlaceIdentifier: string): Promise<void>;

  abstract unblockRequest(searchId: string): Promise<void>;
}
