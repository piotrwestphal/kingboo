import { Document } from 'mongoose';
import { BonusesDocument } from './bonuses.document';
import { RoomDocument } from './room.document';

export interface LatestValuesDocument extends Document {
  readonly price: number;
  readonly rate: number;
  readonly secondaryRate: number;
  readonly secondaryRateType: string;
  readonly numberOfReviews: number;
  readonly newlyAdded: boolean;
  readonly bonuses: BonusesDocument;
  readonly rooms: RoomDocument[];
}
