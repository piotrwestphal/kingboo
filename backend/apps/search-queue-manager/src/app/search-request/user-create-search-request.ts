import { ShortDate } from '../../core/interface/short-date'
import { CollectingScenarioType } from '@kb/model'

export interface UserCreateSearchRequest {
  readonly scenarioType: CollectingScenarioType
  readonly updateFrequencyMinutes: number;
  readonly resultsLimit?: number;
  readonly searchPlace: string;
  readonly checkInDate: ShortDate;
  readonly checkOutDate: ShortDate;
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
}
