import { CheckDateDto } from '../../app/dto/check-date.dto';

export interface CreateSearchRequest {
  readonly priority: number;
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: CheckDateDto;
  readonly checkOutDate: CheckDateDto;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
}
