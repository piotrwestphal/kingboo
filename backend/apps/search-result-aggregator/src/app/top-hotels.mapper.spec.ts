import { TopHotelsMapper } from './top-hotels.mapper'
import { TopHotelsDto } from '@kb/model/hotel/top-hotels.dto'
import { SimpleHotelDto } from '@kb/model'

describe('TopHotelsMapper', () => {

  const topHotelsMapper = new TopHotelsMapper()

  it('should map empty arrays', () => {
    // given
    const topHotels: TopHotelsDto = {
      cheapest: [],
      bestPriceRate: [],
      bestRate: [],
      bestLocation: [],
    }

    // when
    const result = topHotelsMapper.toIndexedTopHotels(topHotels)

    // then
    expect(result.length).toBe(0)
  })

  it('should map properly', () => {
    // given
    const topHotels: TopHotelsDto = {
      cheapest: [{}, {}, {}] as SimpleHotelDto[],
      bestPriceRate: [{}, {}] as SimpleHotelDto[],
      bestRate: [],
      bestLocation: [{}] as SimpleHotelDto[],
    }

    // when
    const result = topHotelsMapper.toIndexedTopHotels(topHotels)

    // then
    expect(result.length).toBe(3)
    const first = result[0]
    expect(first.orderIndex).toBe(0)
    expect(first.cheapest).not.toBeNull()
    expect(first.bestPriceRate).not.toBeNull()
    expect(first.bestRate).toBeNull()
    expect(first.bestLocation).not.toBeNull()

    const second = result[1]
    expect(second.orderIndex).toBe(1)
    expect(second.cheapest).not.toBeNull()
    expect(second.bestPriceRate).not.toBeNull()
    expect(second.bestRate).toBeNull()
    expect(second.bestLocation).toBeNull()

    const third = result[2]
    expect(third.orderIndex).toBe(2)
    expect(third.cheapest).not.toBeNull()
    expect(third.bestPriceRate).toBeNull()
    expect(third.bestRate).toBeNull()
    expect(third.bestLocation).toBeNull()
  })
})
