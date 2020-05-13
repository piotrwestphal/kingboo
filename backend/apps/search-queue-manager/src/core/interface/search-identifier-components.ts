import { SearchRequestType } from '../model/SearchRequestType';

export interface SearchIdentifierComponents {
  readonly type: SearchRequestType;
  readonly searchPlace: string;
  readonly checkInDate: Date;
  readonly checkOutDate: Date;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
}
