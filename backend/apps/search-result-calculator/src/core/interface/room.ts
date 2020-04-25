import { Bonuses } from './bonuses';

export interface Room {
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly personCount: string;
  readonly beds: string;
  readonly bonuses: Bonuses | null;
}
