import { Document } from 'mongoose';
import { BonusesDocument } from './bonuses.document';
import { RoomDocument } from './room.document';

export interface LatestValuesDocument extends Document {
  readonly price: number;
  readonly districtName: string | null;
  readonly distanceFromCenterMeters: number;
  readonly hotelLink: string;
  readonly rate: number;
  readonly secondaryRate: number | null;
  readonly secondaryRateType: string | null;
  readonly numberOfReviews: number | null;
  readonly newlyAdded: boolean;
  readonly starRating: number | null;
  readonly bonuses: BonusesDocument;
  readonly rooms: RoomDocument[];
}
