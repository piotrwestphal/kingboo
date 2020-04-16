import { CollectHotelsScenarioMessage } from '@kb/model/mqmessage/collect-hotels-scenario.message';
import { CollectHotelsScenario } from '../../core/interface/collect-hotels-scenario';

export class CollectHotelsScenarioMapper {
  static fromMessage({
                                   searchId,
                                   resultsLimit,
                                   searchPlace,
                                   checkInDate,
                                   checkOutDate,
                                   numberOfRooms,
                                   numberOfAdults,
                                   childrenAgeAtCheckout,
                                   searchPlaceIdentifier,
                                 }: CollectHotelsScenarioMessage): CollectHotelsScenario {
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
    };
  }
}
