import { CyclicIdentifierComponents } from './interface/cyclic-identifier-components';

export class CyclicIdentifierBuilder {
  createIdentifier({
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
      `${updateFrequencyMinutes}_${resultsLimit}_` +
      `${dayOfTheWeek}_${nightsOfStay}_${beginSearchDaysBefore}`;
  }
}
