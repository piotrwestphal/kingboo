import { SortableValues } from './sortable.values';

export interface SortByOptions {
  readonly primaryKey: keyof SortableValues;
  readonly secondaryKey: keyof SortableValues;
}
