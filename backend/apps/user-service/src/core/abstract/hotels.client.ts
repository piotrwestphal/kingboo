import { SimpleHotelDto, TopHotelsDto } from '@kb/model';
import { Observable } from 'rxjs';

export abstract class HotelsClient {
  abstract getTopHotels(searchId: string,
                        collectingStartedAt: string,
                        collectingFinishedAt: string): Promise<TopHotelsDto | null>;

  abstract getHotels(searchId: string,
                     collectingStartedAt: string,
                     collectingFinishedAt: string): Observable<SimpleHotelDto[]>;
}
