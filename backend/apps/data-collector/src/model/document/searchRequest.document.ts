import { CheckDateDocument } from './checkDate.document';

export interface SearchRequestDocument {
  readonly priority: number;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: CheckDateDocument;
  readonly checkOutDate: CheckDateDocument;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly searchPlaceIdentifier: string;
}
