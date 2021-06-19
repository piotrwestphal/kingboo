import { SearchIdentifierComponents } from './interface/search-identifier-components';
import { TimeHelper } from '@kb/util';

export class SearchIdentifierBuilder {
  createIdentifier({
                     type,
                     scenarioType,
                     searchPlace,
                     checkInDate,
                     checkOutDate,
                     numberOfRooms,
                     numberOfAdults,
                     childrenAgeAtCheckout,
                     updateFrequencyMinutes,
                     resultsLimit,
                   }: SearchIdentifierComponents): string {
    return `${type}_${scenarioType}_${searchPlace.trim().toUpperCase().replace(/ /g, '_')}_` +
      `${this.shorten(checkInDate)}_${this.shorten(checkOutDate)}_` +
      `${numberOfRooms}_${numberOfAdults}_${childrenAgeAtCheckout.join('_')}_` +
      `${updateFrequencyMinutes}_${resultsLimit}`;
  }

  private shorten = (date: Date) => TimeHelper.getFormattedShortDate(date);
}
