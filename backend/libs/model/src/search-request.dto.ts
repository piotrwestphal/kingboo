export interface SearchRequestDto {
  readonly searchId: string;
  readonly type: string;
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: string;
  readonly checkOutDate: string;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly searchPlaceIdentifier?: string;
  readonly nextSearchScheduledAt: string;
}
