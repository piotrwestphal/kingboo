import { SearchDataDto, SearchRequestDto, TopHotelsDto } from '@kb/model';

export class SearchDataMapper {
  fromDto({
                    searchId,
                    type,
                    resultsLimit,
                    searchPlace,
                    searchPlaceIdentifier,
                    checkInDate,
                    checkOutDate,
                    numberOfRooms,
                    numberOfAdults,
                    childrenAgeAtCheckout,
                    updateFrequencyMinutes,
                    collectingFinishedAt,
                    collectingCount,
                  }: SearchRequestDto,
                  topHotelsDto?: TopHotelsDto): SearchDataDto {
    return {
      searchId,
      type,
      resultsLimit,
      searchPlace,
      searchPlaceIdentifier,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      updateFrequencyMinutes,
      collectingFinishedAt,
      collectingCount,
      topHotels: topHotelsDto,
    }
  }
}
