import { TopHotelsDto } from '@kb/model';

export interface SearchResultDto {
  readonly searchId: string;
  readonly type: string;
  readonly searchPlace: string;
  readonly searchPlaceIdentifier?: string;
  readonly checkInDate: string;
  readonly checkOutDate: string;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly updateFrequencyMinutes: number,
  readonly priority: number,
  readonly resultsLimit: number,
  readonly topHotels?: TopHotelsDto;
}
