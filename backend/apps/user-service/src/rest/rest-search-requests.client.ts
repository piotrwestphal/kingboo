import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { HttpService } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { SearchRequestDto } from '@kb/model';
import { map } from 'rxjs/operators';

export class RestSearchRequestsClient extends SearchRequestsClient {
  constructor(
    private readonly config: AppConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  getSearchRequests(): Promise<SearchRequestDto[]> {
    const baseUrl = `${this.config.searchRequestsResourceAddress}/api/v1/search-requests`
    return this.httpService.get<SearchRequestDto[]>(baseUrl)
      .pipe(map(res => res.data)).toPromise()
  }
}
