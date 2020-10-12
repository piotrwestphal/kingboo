import { Coords, HotelCalculatedValuesDto, HotelLatestValuesDto, PriceChangeDto } from '@kb/model';

export interface SimpleHotelDto {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly distanceFromCenterMeters: number;
  readonly districtName: string | null;
  readonly coords: Coords;
  readonly hotelLink: string;
  readonly starRating: number | null;
  readonly priceChanges: PriceChangeDto[];
  readonly latestValues: HotelLatestValuesDto;
  readonly calculatedValues: HotelCalculatedValuesDto;
  readonly lastCollectedAt: string;
  readonly collectingCount: number;
}
