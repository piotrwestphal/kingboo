import { SimpleHotel } from './simple-hotel';

export interface TopHotels {
  readonly cheapest: SimpleHotel[];
  readonly bestPriceRate: SimpleHotel[];
  readonly bestRate: SimpleHotel[];
  readonly bestLocation: SimpleHotel[];
}
