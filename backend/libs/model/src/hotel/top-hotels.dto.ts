import { SimpleHotelDto } from '@kb/model';

export interface TopHotelsDto {
  readonly cheapest: SimpleHotelDto[];
  readonly bestPriceRate: SimpleHotelDto[];
  readonly bestRate: SimpleHotelDto[];
  readonly bestLocation: SimpleHotelDto[];
}
