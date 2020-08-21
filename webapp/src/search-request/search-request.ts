export interface SearchRequest {
  readonly searchId: string;
  readonly type: string;
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: Date;
  readonly checkOutDate: Date;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly searchPlaceIdentifier: string | null;
  readonly nextSearchScheduledAt: Date;
}
