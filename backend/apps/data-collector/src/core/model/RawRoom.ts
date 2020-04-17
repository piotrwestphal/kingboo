export class RawRoom {
  constructor(
    public readonly description: string,
    public readonly personCount: string,
    public readonly beds: string | null,
    public readonly bonuses: string[] | null,
  ) {
  }
}
