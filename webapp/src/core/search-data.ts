import { TopHotelsDto } from './dto/top-hotels.dto';
import { SearchRequestType } from './SearchRequestType';

export interface SearchData {
  readonly searchId: string;
  readonly type: SearchRequestType;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: string;
  readonly stayDate: string;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly updateFrequencyMinutes: number;
  readonly destination: string | null;
  readonly collectingFinishedAt: string | null;
  readonly topHotels: TopHotelsDto | null;
}
