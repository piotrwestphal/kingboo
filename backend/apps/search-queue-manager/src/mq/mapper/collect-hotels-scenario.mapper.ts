import { SearchRequest } from '../../core/model/SearchRequest';
import { CollectHotelsScenarioMessage } from '@kb/model/mqmessage/collect-hotels-scenario.message';

export class CollectHotelsScenarioMapper {
  static fromSearchRequest({
                             searchId,
                             resultsLimit,
                             searchPlace,
                             checkInDate,
                             checkOutDate,
                             numberOfRooms,
                             numberOfAdults,
                             childrenAgeAtCheckout,
                             searchPlaceIdentifier,
                           }: SearchRequest): CollectHotelsScenarioMessage {
    return {
      searchId,
      scenario: {
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
      timestamp: Date.now(),
    };
  }
}
