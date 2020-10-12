import { Coords } from '../coords';
import { HotelLatestValuesDto } from './hotel-latest-values.dto';
import { HotelCalculatedValuesDto } from './hotel-calculated-values.dto';
import { HotelPriceChangeDto } from './hotel-price-change.dto';

export interface SimpleHotelDto {
  readonly searchId: string;
  readonly hotelId: string;
  readonly name: string;
  readonly distanceFromCenterMeters: number;
  readonly districtName: string | null;
  readonly coords: Coords;
  readonly hotelLink: string;
  readonly propertyType: string;
  readonly starRating: number;
  readonly priceChanges: HotelPriceChangeDto[];
  readonly latestValues: HotelLatestValuesDto;
  readonly calculatedValues: HotelCalculatedValuesDto;
  readonly lastCollectedAt: string;
  readonly collectingCount: number;
}
