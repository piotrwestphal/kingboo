import { IndexedTopHotels, SearchRequestDto } from '@kb/model'
import { SearchDataMapper } from './search-data.mapper'

describe('SearchDataMapper', () => {

  const mapper = new SearchDataMapper()

  it('should map topHotels properly [1]', () => {
    const searchRequestDto = {} as SearchRequestDto
    const indexedTopHotels = [] as IndexedTopHotels[]
    const result = mapper.toDto(searchRequestDto, indexedTopHotels)

    expect(result.topHotels).toBeNull()
  })
  it('should map topHotels properly [2]', () => {
    const searchRequestDto = {} as SearchRequestDto
    const indexedTopHotels = [
      {
        cheapest: {},
        bestPriceRate: {},
        bestRate: {},
        bestLocation: null,
      },
      {
        cheapest: {},
        bestPriceRate: {},
        bestRate: null,
        bestLocation: null,
      },
    ] as IndexedTopHotels[]
    const result = mapper.toDto(searchRequestDto, indexedTopHotels)

    expect(result.topHotels.cheapest.length).toBe(2)
    expect(result.topHotels.bestPriceRate.length).toBe(2)
    expect(result.topHotels.bestRate.length).toBe(1)
    expect(result.topHotels.bestLocation.length).toBe(0)
  })
})
