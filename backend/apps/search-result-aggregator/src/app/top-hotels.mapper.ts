import { IndexedTopHotels } from '@kb/model'
import { Injectable } from '@nestjs/common'
import { TopHotels } from '../core/interface/top-hotels'

@Injectable()
export class TopHotelsMapper {
  toIndexedTopHotels(topHotels: TopHotels): IndexedTopHotels[] {
    const lengths = Object.values(topHotels).map((v) => v.length)
    const maxLength = Math.max(...lengths)
    const topHotelsKeys = Object.keys(topHotels)
    return [...Array(maxLength)].map((_, idx) => {
      const topHotelsDto = topHotelsKeys.reduce((dto: Omit<IndexedTopHotels, 'orderIndex'>, topHotelKey) =>
        ({
          ...dto,
          [topHotelKey]: topHotels[topHotelKey][idx] || null
        }), {} as Omit<IndexedTopHotels, 'orderIndex'>)
      return {
        orderIndex: idx,
        ...topHotelsDto,
      }
    })
  }
}
