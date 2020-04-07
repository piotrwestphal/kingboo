import { IdentifierComponents } from './interface/identifier-components';

export class SearchIdentifierBuilder {
  createIdentifier({
                            searchPlace,
                            checkInDate,
                            checkOutDate,
                            numberOfRooms,
                            numberOfAdults,
                            childrenAgeAtCheckout,
                            priority,
                            updateFrequencyMinutes,
                            resultsLimit,
                          }: IdentifierComponents): string {
    return `${searchPlace.trim().toUpperCase().replace(/ /g, '_')}_` +
      `${checkInDate.year}-${checkInDate.month}-${checkInDate.day}_` +
      `${checkOutDate.year}-${checkOutDate.month}-${checkOutDate.day}_` +
      `${numberOfRooms}_${numberOfAdults}_${childrenAgeAtCheckout.length}_` +
      `${priority}_${updateFrequencyMinutes}_${resultsLimit}`;
  }
}
