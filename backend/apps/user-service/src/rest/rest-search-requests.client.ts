import { SearchRequestsClient } from '../core/abstract/search-requests.client';
import { HttpService } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { SearchRequestDto } from '@kb/model';
import { map } from 'rxjs/operators';
import { SearchRequestsDto } from '@kb/model/search-requests.dto';

export class RestSearchRequestsClient extends SearchRequestsClient {
  constructor(
    private readonly config: AppConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  getSearchRequests(): Promise<SearchRequestDto[]> {
    const baseUrl = `${this.config.searchRequestsResourceAddress}/api/v1/search-requests`
    return this.httpService.get<SearchRequestsDto>(baseUrl)
      .pipe(map(res => res.data.searchRequests)).toPromise()
  }
}
