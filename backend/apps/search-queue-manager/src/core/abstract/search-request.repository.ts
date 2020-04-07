import { SearchRequest } from '../model/SearchRequest';

export abstract class SearchRequestRepository {
  abstract findBySearchId(searchId: string): Promise<SearchRequest>;
  abstract create(searchRequest: SearchRequest): Promise<SearchRequest>;
  abstract update(searchRequest: SearchRequest): Promise<SearchRequest>;
}
