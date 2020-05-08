import { CyclicSearch } from '../../core/model/CyclicSearch';
import { SaveCyclicSearch } from '../interface/save-cyclic-search';
import { CyclicSearchDocument } from '../interface/cyclic-search.document';

export class CyclicSearchDocumentMapper {

  toCyclicSearch({
                   cyclicId,
                   priority,
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
      priority,
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
                   priority,
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
      priority,
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
