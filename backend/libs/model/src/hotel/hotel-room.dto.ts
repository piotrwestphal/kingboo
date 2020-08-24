import { HotelBonusesDto } from '@kb/model';

export interface HotelRoomDto {
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly personCount: string;
  readonly beds: string;
  readonly bonuses: HotelBonusesDto | null;
}
