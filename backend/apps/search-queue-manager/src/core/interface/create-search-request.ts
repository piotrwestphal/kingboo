import { CheckDate } from './check-date';

export interface CreateSearchRequest {
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: CheckDate;
  readonly checkOutDate: CheckDate;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
}
