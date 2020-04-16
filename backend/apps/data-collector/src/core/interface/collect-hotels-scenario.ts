import { CheckDate } from './check-date';

export interface CollectHotelsScenario {
  readonly searchId: string;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: CheckDate;
  readonly checkOutDate: CheckDate;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly searchPlaceIdentifier: string;
}
