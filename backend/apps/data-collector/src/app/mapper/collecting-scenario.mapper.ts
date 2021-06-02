import { CollectingScenario } from '../../core/interface/collecting-scenario';
import { CollectingScenarioDto } from '@kb/model';

export class CollectingScenarioMapper {
  static fromMessage({
                       type,
                       resultsLimit,
                       searchPlace,
                       checkInDate,
                       checkOutDate,
                       numberOfRooms,
                       numberOfAdults,
                       childrenAgeAtCheckout,
                       searchPlaceIdentifier,
                     }: CollectingScenarioDto): CollectingScenario {
    return {
      type,
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
