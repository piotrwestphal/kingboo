import { TopHotelsClient } from '../core/abstract/top-hotels.client';
import { HttpService } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { TopHotelsDto } from '@kb/model';
import { map } from 'rxjs/operators';

export class RestTopHotelsClient extends TopHotelsClient {
  constructor(
    private readonly config: AppConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  getTopHotels(searchId: string): Promise<TopHotelsDto> {
    const baseUrl = `${this.config.topHotelsResourceAddress}/api/v1/top-hotels`
    return this.httpService.get<TopHotelsDto>(`${baseUrl}?search_id=${searchId}`)
      .pipe(
        map(res => res.data),
      ).toPromise();
  }
}
