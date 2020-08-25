import { CyclicIdentifierComponents } from './interface/cyclic-identifier-components';

export class CyclicIdentifierBuilder {
  createIdentifier({
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
                   }: CyclicIdentifierComponents): string {
    return `${searchPlace.trim().toUpperCase().replace(/ /g, '_')}_` +
      `${numberOfRooms}_${numberOfAdults}_${childrenAgeAtCheckout.length}_` +
      `${priority}_${updateFrequencyMinutes}_${resultsLimit}_` +
      `${dayOfTheWeek}_${nightsOfStay}_${beginSearchDaysBefore}`;
  }
}
