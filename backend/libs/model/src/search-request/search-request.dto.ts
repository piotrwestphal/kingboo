export interface SearchRequestDto {
  readonly searchId: string
  readonly type: string
  readonly updateFrequencyMinutes: number
  readonly resultsLimit: number
  readonly searchPlace: string
  readonly checkInDate: string
  readonly checkOutDate: string
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
  readonly destination: string | null
  readonly collectingStartedAt: string | null
  readonly collectingFinishedAt: string | null
}
