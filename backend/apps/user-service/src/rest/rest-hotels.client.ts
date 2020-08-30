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

  getTopHotels(searchId: string,
               collectingStartedAt: string,
               collectingFinishedAt: string | null): Promise<TopHotelsDto | null> {
    const baseUrl = `${this.config.hotelsResourceAddress}/api/v1/top-hotels`
    const urlQuery = this.buildUrlQuery(searchId, collectingStartedAt, collectingFinishedAt)
    return this.httpService.get<TopHotelsDto>(`${baseUrl}${urlQuery}`)
      .pipe(
        map(res => res.data),
        catchError((err) => {
          logger.error(`Error when retrieving top hotels for ${searchId}`, err)
          return of(null)
        })
      ).toPromise();
  }

  getHotels(searchId: string,
            collectingStartedAt: string,
            collectingFinishedAt: string | null): Observable<SimpleHotelDto[]> {
    const baseUrl = `${this.config.hotelsResourceAddress}/api/v1/hotels`
    const urlQuery = this.buildUrlQuery(searchId, collectingStartedAt, collectingFinishedAt)
    return this.httpService.get<TopHotelsDto>(`${baseUrl}${urlQuery}`)
      .pipe(
        map(res => res.data),
        catchError((err) => {
          logger.error(`Error when retrieving hotels for ${searchId}`, err)
          return of(null)
        })
      )
  }

  private buildUrlQuery = (searchId: string,
                           collectingStartedAt: string,
                           collectingFinishedAt: string | null) => {
    const mandatoryQuery = `?search_id=${encodeURIComponent(searchId)}` +
      `&collecting_started_at=${collectingStartedAt}`;
    return collectingFinishedAt
      ? `${mandatoryQuery}&collecting_finished_at=${collectingFinishedAt}`
      : mandatoryQuery
  }
}
