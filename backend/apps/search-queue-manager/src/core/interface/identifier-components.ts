import { CheckDate } from '../model/CheckDate';

export interface IdentifierComponents {
  readonly searchPlace: string;
  readonly checkInDate: CheckDate;
  readonly checkOutDate: CheckDate;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
}
