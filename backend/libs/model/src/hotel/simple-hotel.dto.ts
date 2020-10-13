import { Coords, HotelCalculatedValuesDto, HotelLatestValuesDto, PriceChangeDto } from '@kb/model';

export interface SimpleHotelDto {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly coords: Coords;
  readonly priceChanges: PriceChangeDto[];
  readonly latestValues: HotelLatestValuesDto;
  readonly calculatedValues: HotelCalculatedValuesDto;
  readonly lastCollectedAt: string;
  readonly collectingCount: number;
}
