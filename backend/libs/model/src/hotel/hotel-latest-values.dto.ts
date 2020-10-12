import { HotelBonusesDto } from '@kb/model';
import { HotelRoomDto } from '@kb/model';

export interface HotelLatestValuesDto {
  readonly price: number;
  readonly rate: number;
  readonly secondaryRate: number | null;
  readonly secondaryRateType: string | null;
  readonly numberOfReviews: number;
  readonly newlyAdded: boolean;
  readonly bonuses: HotelBonusesDto | null;
  readonly rooms: HotelRoomDto[] | null;
}
