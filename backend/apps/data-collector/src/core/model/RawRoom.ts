export class RawRoom {
  constructor(
    public readonly shortDescription: string,
    public readonly longDescription: string,
    public readonly personCount: string,
    public readonly beds: string | null,
    public readonly bonuses: string[] | null,
  ) {
  }
}
