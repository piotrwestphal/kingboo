import { CollectingScenario } from '../../core/interface/collecting-scenario';
import { CollectingScenarioDto } from '@kb/model';

export class CollectingScenarioMapper {
  fromMessage({
                       type,
                       resultsLimit,
                       searchPlace,
                       checkInDate,
                       checkOutDate,
                       numberOfRooms,
                       numberOfAdults,
                       childrenAgeAtCheckout,
                     }: Omit<CollectingScenarioDto, 'searchPlaceIdentifier'>): CollectingScenario {
    return {
      type,
      resultsLimit,
      searchPlace,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
    };
  }
}
