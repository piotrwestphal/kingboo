import { CyclicSearch } from '../../core/model/CyclicSearch';
import { SaveCyclicSearch } from './save-cyclic-search';
import { CyclicSearchDocument } from './cyclic-search.document';

export class CyclicSearchDocumentMapper {

  toCyclicSearch({
                   cyclicId,
                   updateFrequencyMinutes,
                   resultsLimit,
                   searchPlace,
                   numberOfRooms,
                   numberOfAdults,
                   childrenAgeAtCheckout,
                   dayOfTheWeek,
                   offsetDays,
                   nightsOfStay,
                   beginSearchDaysBefore,
                   cyclicSearchRequests,
                 }: CyclicSearchDocument): CyclicSearch {
    return CyclicSearch.create({
      cyclicId,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      dayOfTheWeek,
      offsetDays,
      nightsOfStay,
      beginSearchDaysBefore,
      cyclicSearchRequests,
    });
  }

  prepareForSave({
                   cyclicId,
                   updateFrequencyMinutes,
                   resultsLimit,
                   searchPlace,
                   numberOfRooms,
                   numberOfAdults,
                   childrenAgeAtCheckout,
                   dayOfTheWeek,
                   offsetDays,
                   nightsOfStay,
                   beginSearchDaysBefore,
                   cyclicSearchRequests,
                 }: CyclicSearch): SaveCyclicSearch {
    return {
      cyclicId,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      dayOfTheWeek,
      offsetDays,
      nightsOfStay,
      beginSearchDaysBefore,
      cyclicSearchRequests,
    };
  }
}
