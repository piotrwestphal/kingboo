import { TopHotelsClient } from '../core/abstract/top-hotels.client';
import { HttpService } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { TopHotelsDto } from '@kb/model';
import { catchError, map } from 'rxjs/operators';
import { logger } from '../logger';
import { of } from 'rxjs';

export class RestTopHotelsClient extends TopHotelsClient {
  constructor(
    private readonly config: AppConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  getTopHotels(searchId: string): Promise<TopHotelsDto | null> {
    const baseUrl = `${this.config.topHotelsResourceAddress}/api/v1/top-hotels`
    return this.httpService.get<TopHotelsDto>(`${baseUrl}?search_id=${searchId}`)
      .pipe(
        map(res => res.data),
        catchError((err) => {
          logger.error(`Error when retrieving top hotels for ${searchId}`, err)
          return of(null)
        })
      ).toPromise();
  }
}
