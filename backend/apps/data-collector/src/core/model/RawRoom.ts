export class RawRoom {
  constructor(
    public readonly shortDescription: string,
    public readonly longDescription: string | null,
    public readonly personCount: string,
    public readonly beds: string,
    public readonly bonuses: string[] | null,
  ) {
  }
}
