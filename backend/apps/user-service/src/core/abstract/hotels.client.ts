import { SimpleHotelDto, TopHotelsDto } from '@kb/model';
import { Observable } from 'rxjs';

export abstract class HotelsClient {
  abstract getTopHotels(searchId: string): Promise<TopHotelsDto | null>;
  abstract getHotels(searchId: string): Observable<SimpleHotelDto[]>;
}
