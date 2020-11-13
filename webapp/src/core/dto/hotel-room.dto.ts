import { HotelBonusesDto } from './hotel-bonuses.dto';

export interface HotelRoomDto {
  readonly shortDescription: string;
  readonly longDescription: string | null;
  readonly personCount: string;
  readonly beds: string;
  readonly bonuses: HotelBonusesDto | null;
}
