import { HotelsClient } from '../core/abstract/hotels.client';
import { HttpService } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { SimpleHotelDto, TopHotelsDto } from '@kb/model';
import { catchError, map } from 'rxjs/operators';
import { logger } from '../logger';
import { Observable, of } from 'rxjs';

export class RestHotelsClient extends HotelsClient {
  constructor(
    private readonly config: AppConfigService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  getTopHotels(searchId: string): Promise<TopHotelsDto | null> {
    const baseUrl = `${this.config.hotelsResourceAddress}/api/v1/top-hotels`
    return this.httpService.get<TopHotelsDto>(`${baseUrl}?search_id=${encodeURIComponent(searchId)}`)
      .pipe(
        map(res => res.data),
        catchError((err) => {
          logger.error(`Error when retrieving top hotels for ${searchId}`, err)
          return of(null)
        })
      ).toPromise();
  }

  getHotels(searchId: string): Observable<SimpleHotelDto[]> {
    const baseUrl = `${this.config.hotelsResourceAddress}/api/v1/hotels`
    return this.httpService.get<TopHotelsDto>(`${baseUrl}?search_id=${encodeURIComponent(searchId)}`)
      .pipe(
        map(res => res.data),
        catchError((err) => {
          logger.error(`Error when retrieving hotels for ${searchId}`, err)
          return of(null)
        })
      )
  }
}
