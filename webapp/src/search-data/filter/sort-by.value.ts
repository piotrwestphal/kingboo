import { SortByOptions } from './sort-by.options';

export const sortByValue = {
  place: {
    primaryKey: 'searchPlace',
    secondaryKey: 'checkInDate',
  } as SortByOptions,
  date: {
    primaryKey: 'checkInDate',
    secondaryKey: 'searchPlace',
  } as SortByOptions
}
