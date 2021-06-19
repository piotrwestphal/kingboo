import { SearchRequest } from '../../core/model/SearchRequest'
import { CollectHotelsScenarioMessage } from '@kb/model/mqmessage/collect-hotels-scenario.message'

export class CollectHotelsScenarioMapper {
  static fromSearchRequest({
                             searchId,
                             scenarioType,
                             resultsLimit,
                             searchPlace,
                             checkInDate,
                             checkOutDate,
                             numberOfRooms,
                             numberOfAdults,
                             childrenAgeAtCheckout,
                             searchPlaceIdentifier,
                             updateFrequencyMinutes,
                           }: SearchRequest): CollectHotelsScenarioMessage {
    return {
      searchId,
      scenario: {
        type: scenarioType,
        resultsLimit,
        searchPlace,
        checkInDate: {
          day: checkInDate.getDate(),
          month: checkInDate.getMonth() + 1,
          year: checkInDate.getFullYear(),
        },
        checkOutDate: {
          day: checkOutDate.getDate(),
          month: checkOutDate.getMonth() + 1,
          year: checkOutDate.getFullYear(),
        },
        numberOfRooms,
        numberOfAdults,
        childrenAgeAtCheckout,
        searchPlaceIdentifier,
      },
      updateFrequencyMinutes,
      timestamp: Date.now(),
    }
  }
}
