import { Bonuses } from '../../../core/interface/bonuses';
import { Room } from '../../../core/interface/room';

export interface LatestValuesDocument {
  readonly price: number;
  readonly rate: number;
  readonly secondaryRate: number;
  readonly secondaryRateType: string;
  readonly numberOfReviews: number;
  readonly newlyAdded: boolean;
  readonly bonuses: Bonuses | null;
  readonly rooms: Room[];
}
