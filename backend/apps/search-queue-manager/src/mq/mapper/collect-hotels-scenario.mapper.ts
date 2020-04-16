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
      resultsLimit,
      searchPlace,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      searchPlaceIdentifier,
      timestamp: Date.now(),
    };
  }
}
