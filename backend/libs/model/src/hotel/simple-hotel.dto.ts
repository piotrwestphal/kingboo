import { Coords, HotelCalculatedValuesDto, HotelLatestValuesDto } from '@kb/model';

export interface SimpleHotelDto {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly distanceFromCenterMeters: number;
  readonly districtName: string;
  readonly coords: Coords;
  readonly hotelLink: string;
  readonly propertyType: string;
  readonly starRating: number;
  readonly latestValues: HotelLatestValuesDto;
  readonly calculatedValues: HotelCalculatedValuesDto;
}
