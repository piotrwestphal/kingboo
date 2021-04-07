import { SaveSearchPlaceIdentifier } from './save-search-place-identifier'

export interface SaveSearchRequest {

  readonly searchId: string;
  readonly type: string;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;

  readonly searchPlace: string;
  readonly checkInDate: Date;
  readonly checkOutDate: Date;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];

  readonly searchPlaceIdentifier: SaveSearchPlaceIdentifier | null;
  readonly nextSearchScheduledAt: Date;
  readonly collectingStartedAt: Date;
  readonly collectingFinishedAt: Date;
  readonly collectingCount: number;
}
