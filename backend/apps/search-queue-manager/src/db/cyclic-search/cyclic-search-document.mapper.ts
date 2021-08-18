import { CyclicSearch } from '../../core/model/CyclicSearch';
import { SaveCyclicSearch } from './save-cyclic-search';
import { CyclicSearchDocument } from './cyclic-search.document';
import { CollectingScenarioType } from '@kb/model'

export class CyclicSearchDocumentMapper {

  toCyclicSearch({
                   cyclicId,
                   scenarioType,
                   updateFrequencyMinutes,
                   resultsLimit,
                   searchPlace,
                   numberOfRooms,
                   numberOfAdults,
                   childrenAgeAtCheckout,
                   dayOfTheWeek,
                   nightsOfStay,
                   beginSearchDaysBefore,
                   cyclicSearchRequests,
                 }: CyclicSearchDocument): CyclicSearch {
    return CyclicSearch.create({
      cyclicId,
      scenarioType: scenarioType as CollectingScenarioType ?? CollectingScenarioType.COLLECT_HOTELS,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      dayOfTheWeek,
      nightsOfStay,
      beginSearchDaysBefore,
      cyclicSearchRequests,
    });
  }

  prepareForSave({
                   cyclicId,
                   scenarioType,
                   updateFrequencyMinutes,
                   resultsLimit,
                   searchPlace,
                   numberOfRooms,
                   numberOfAdults,
                   childrenAgeAtCheckout,
                   dayOfTheWeek,
                   nightsOfStay,
                   beginSearchDaysBefore,
                   cyclicSearchRequests,
                 }: CyclicSearch): SaveCyclicSearch {
    return {
      cyclicId,
      // TODO: until every cyclic search on prod has `scenarioType` value
      scenarioType: scenarioType as CollectingScenarioType ?? CollectingScenarioType.COLLECT_HOTELS,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      dayOfTheWeek,
      nightsOfStay,
      beginSearchDaysBefore,
      cyclicSearchRequests,
    };
  }
}
