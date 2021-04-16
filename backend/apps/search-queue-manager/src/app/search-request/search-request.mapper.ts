import { SearchRequestDto } from '@kb/model'
import { SearchRequest } from '../../core/model/SearchRequest'

export class SearchRequestMapper {
  toDto({
          searchId,
          type,
          updateFrequencyMinutes,
          resultsLimit,
          searchPlace,
          checkInDate,
          checkOutDate,
          numberOfRooms,
          numberOfAdults,
          childrenAgeAtCheckout,
          searchPlaceIdentifier,
          collectingStartedAt,
          collectingFinishedAt,
        }: SearchRequest): SearchRequestDto {
    return {
      searchId,
      type,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      destination: searchPlaceIdentifier?.destination ?? null,
      collectingStartedAt: collectingStartedAt?.toISOString() || null,
      collectingFinishedAt: collectingFinishedAt?.toISOString() || null,
    }
  }
}
