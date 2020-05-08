import { ShortDate } from '../../core/interface/short-date';

export interface UserCreateSearchRequest {
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: ShortDate;
  readonly checkOutDate: ShortDate;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
}
