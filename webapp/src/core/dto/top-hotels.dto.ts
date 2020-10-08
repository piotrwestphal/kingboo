import { SimpleHotelDto } from './simple-hotel.dto';

export interface TopHotelsDto {
  readonly cheapest: SimpleHotelDto[];
  readonly bestPriceRate: SimpleHotelDto[];
  readonly bestRate: SimpleHotelDto[];
  readonly bestLocation: SimpleHotelDto[];
}
