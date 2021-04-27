import { SearchDataDto, SearchRequestDto, TopHotelsDto } from '@kb/model'

export class SearchDataMapper {
  toDto({
          searchId,
          type,
          resultsLimit,
          searchPlace,
          destination,
          checkInDate,
          checkOutDate,
          numberOfRooms,
          numberOfAdults,
          childrenAgeAtCheckout,
          updateFrequencyMinutes,
          collectingFinishedAt,
        }: SearchRequestDto,
        topHotels: TopHotelsDto | null): SearchDataDto {
    return {
      searchId,
      type,
      resultsLimit,
      searchPlace,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      updateFrequencyMinutes,
      destination,
      collectingFinishedAt,
      topHotels,
    }
  }
}
