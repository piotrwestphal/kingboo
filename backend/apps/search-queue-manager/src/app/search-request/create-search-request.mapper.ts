import { UserCreateSearchRequest } from './user-create-search-request'
import { CreateSearchRequest } from './create-search-request'
import { ShortDate } from '../../core/interface/short-date'

type CreateSearchRequestWithoutCheckDates = Omit<CreateSearchRequest, 'checkInDate' | 'checkOutDate'>

export class CreateSearchRequestMapper {
  fromUserCreateSearchRequest({
                                checkInDate,
                                checkOutDate,
                                ...rest
                              }: UserCreateSearchRequest): CreateSearchRequest {
    return {
      ...rest,
      checkInDate: this.mapShortDate(checkInDate),
      checkOutDate: this.mapShortDate(checkOutDate),
    }
  }

  fromCyclicSearch({
                     scenarioType,
                     updateFrequencyMinutes,
                     resultsLimit,
                     searchPlace,
                     numberOfRooms,
                     numberOfAdults,
                     childrenAgeAtCheckout,
                   }: CreateSearchRequestWithoutCheckDates,
                   checkInDate: Date,
                   checkOutDate: Date): CreateSearchRequest {
    return {
      scenarioType,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      checkInDate,
      checkOutDate,
    }
  }

  private mapShortDate = ({ year, month, day }: ShortDate): Date => new Date(year, (month - 1), day)
}
