import { IndexedTopHotels, SearchDataDto, SearchRequestDto, TopHotelsDto } from '@kb/model'

export class SearchDataMapper {
  toDto({
          collectingStartedAt,
          ...rest
        }: SearchRequestDto,
        indexedTopHotelsList: IndexedTopHotels[]): SearchDataDto {
    return {
      ...rest,
      topHotels: indexedTopHotelsList.length
        ? this.toTopHotels(indexedTopHotelsList)
        : null,
    }
  }

  private toTopHotels(indexedTopHotelsList: IndexedTopHotels[]): TopHotelsDto {
    return (['cheapest', 'bestPriceRate', 'bestRate', 'bestLocation'] as Array<keyof TopHotelsDto>)
      .reduce((dto, key) => {
        const hotels = indexedTopHotelsList.map(indexedTopHotels => indexedTopHotels[key]).filter(v => !!v)
        return {
          ...dto,
          [key]: hotels
        }
      }, {} as TopHotelsDto)
  }
}
