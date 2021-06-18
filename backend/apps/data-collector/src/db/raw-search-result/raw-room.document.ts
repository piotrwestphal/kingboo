export interface RawRoomDocument {
  readonly shortDescription: string
  readonly longDescription: string
  readonly personCount: string
  readonly beds: string
  readonly bonuses: string[] | null
}
