import { SortedByOption } from '../interface/sorted-by-option'
import { SimpleHotelDto } from '@kb/model'

export abstract class HotelRepository {
  abstract findTopHotels(searchId: string,
                         collectingStartedAt: string,
                         collectingFinishedAt: string | null,
                         sortedBy: SortedByOption[],
                         limit: number): Promise<SimpleHotelDto[]>
}
