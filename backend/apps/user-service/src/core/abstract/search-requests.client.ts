import { SearchRequestDto } from '@kb/model';

export abstract class SearchRequestsClient {
  abstract getSearchRequests(): Promise<SearchRequestDto[]>;
}
