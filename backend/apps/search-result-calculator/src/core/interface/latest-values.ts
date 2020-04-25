import { Room } from './room';
import { Bonuses } from './bonuses';

export interface LatestValues {
  readonly price: number;
  readonly rate: number;
  readonly secondaryRate: number;
  readonly secondaryRateType: string;
  readonly numberOfReviews: number;
  readonly newlyAdded: boolean;
  readonly bonuses: Bonuses | null;
  readonly rooms: Room[];
}
