import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { HttpService } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { SearchRequestDto, SearchRequestsDto } from '@kb/model';
import { catchError, map } from 'rxjs/operators';
import { logger } from '../logger';
import { of } from 'rxjs';

export class RestSearchRequestsClient extends SearchRequestsClient {
  constructor(
    private readonly config: AppConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  getSearchRequest(searchId: string): Promise<SearchRequestDto | null> {
    const baseUrl = `${this.config.searchRequestsResourceAddress}/api/v1/search-requests/${searchId}`
    return this.httpService.get<SearchRequestDto>(baseUrl)
      .pipe(
        map(res => res.data),
        catchError((err) => {
          logger.error(`Error when retrieving search request for [${searchId}]`, err)
          return of(null)
        })
      ).toPromise()
  }

  getSearchRequests(): Promise<SearchRequestDto[]> {
    const baseUrl = `${this.config.searchRequestsResourceAddress}/api/v1/search-requests`
    return this.httpService.get<SearchRequestsDto>(baseUrl)
      .pipe(map(res => res.data.searchRequests)).toPromise()
  }
}
