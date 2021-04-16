import { SimpleHotel } from '../interface/simple-hotel'
import { SortedByOption } from '../interface/sorted-by-option'

export abstract class HotelRepository {
  abstract findTopHotels(searchId: string,
                         collectingStartedAt: string,
                         collectingFinishedAt: string | null,
                         sortedBy: SortedByOption[],
                         limit: number): Promise<SimpleHotel[]>
}
