export interface RawRoomDocument {
  readonly shortDescription: string
  readonly longDescription: string | null
  readonly personCount: string
  readonly beds: string
  readonly bonuses: string[] | null
}
