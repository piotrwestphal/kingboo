import { SearchIdentifierComponents } from './interface/search-identifier-components';
import { TimeHelper } from '@kb/util';

export class SearchIdentifierBuilder {
  createIdentifier({
                     type,
                     searchPlace,
                     checkInDate,
                     checkOutDate,
                     numberOfRooms,
                     numberOfAdults,
                     childrenAgeAtCheckout,
                     priority,
                     updateFrequencyMinutes,
                     resultsLimit,
                   }: SearchIdentifierComponents): string {
    return `${type}_${searchPlace.trim().toUpperCase().replace(/ /g, '_')}_` +
      `${this.shorten(checkInDate)}_${this.shorten(checkOutDate)}_` +
      `${numberOfRooms}_${numberOfAdults}_${childrenAgeAtCheckout.length}_` +
      `${priority}_${updateFrequencyMinutes}_${resultsLimit}`;
  }

  private shorten = (date: Date) => TimeHelper.getFormattedShortDate(date);
}
