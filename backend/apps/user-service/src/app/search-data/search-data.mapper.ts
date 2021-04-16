import { SearchDataDto, SearchRequestDto, TopHotelsDto } from '@kb/model'
import { CacheData } from '../../core/model/CacheData'

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
        topHotelsCache?: CacheData<TopHotelsDto>): SearchDataDto {
    return {
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
      collectingFinishedAt: topHotelsCache?.collectingFinishedAt || collectingFinishedAt,
      topHotels: topHotelsCache?.data || null,
    }
  }
}
