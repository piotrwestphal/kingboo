import { CheckDate } from './check-date';
import { SearchPlaceIdentifier } from './search-place-identifier'

export interface CollectHotelsScenario {
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: CheckDate;
  readonly checkOutDate: CheckDate;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly searchPlaceIdentifier: SearchPlaceIdentifier | null;
}
