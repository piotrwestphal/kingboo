import { CollectHotelsScenario } from '../../core/interface/collect-hotels-scenario';
import { CollectHotelsScenarioDto } from '@kb/model';

export class CollectHotelsScenarioMapper {
  static fromMessage({
                       resultsLimit,
                       searchPlace,
                       checkInDate,
                       checkOutDate,
                       numberOfRooms,
                       numberOfAdults,
                       childrenAgeAtCheckout,
                       searchPlaceIdentifier,
                     }: CollectHotelsScenarioDto): CollectHotelsScenario {
    return {
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
