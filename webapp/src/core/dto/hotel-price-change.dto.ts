export interface HotelPriceChangeDto {
  readonly price: number | null
  readonly room: string | null
  readonly occurrenceCount: number
  readonly changedAt: string
}
