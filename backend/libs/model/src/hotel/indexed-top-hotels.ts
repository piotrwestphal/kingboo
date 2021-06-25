import { SimpleHotelDto } from '@kb/model'

export interface IndexedTopHotels {
  readonly orderIndex: number
  readonly cheapest: SimpleHotelDto | null
  readonly bestPriceRate: SimpleHotelDto | null
  readonly bestRate: SimpleHotelDto | null
  readonly bestLocation: SimpleHotelDto | null
}
