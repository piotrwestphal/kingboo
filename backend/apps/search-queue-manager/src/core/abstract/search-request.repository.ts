import { SearchRequest } from '../model/SearchRequest'
import { SearchRequestType } from '../model/SearchRequestType';

export abstract class SearchRequestRepository {
  abstract findBySearchId(searchId: string): Promise<SearchRequest>;
  abstract findBySearchIdOrFail(searchId: string): Promise<SearchRequest>;
  abstract findAll(): Promise<SearchRequest[]>
  abstract findAllWithSearchIds(searchIds: string[]): Promise<SearchRequest[]>
  abstract findAllWithType(type: SearchRequestType): Promise<SearchRequest[]>
  abstract create(searchRequest: SearchRequest): Promise<SearchRequest>;
  abstract update(searchRequest: SearchRequest): Promise<SearchRequest>;
  abstract deleteMany(searchIds: string[]): Promise<number>;
  abstract findFree(now: Date): Promise<SearchRequest[]>;
  abstract findObsoleteCyclicRequests(now: Date): Promise<SearchRequest[]>;
}
