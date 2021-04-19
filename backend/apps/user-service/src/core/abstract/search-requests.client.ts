import { SearchRequestDto } from '@kb/model'

export abstract class SearchRequestsClient {
  abstract getSearchRequest(searchId: string): Promise<SearchRequestDto | null>
  abstract getSearchRequests(): Promise<SearchRequestDto[]>
}
