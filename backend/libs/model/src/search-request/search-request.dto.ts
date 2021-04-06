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
  readonly searchPlaceIdentifier: null | {
    readonly destination: string
    readonly destId: string
    readonly destType: string
    readonly placeIdLat: string
    readonly placeIdLon: string
  }
  readonly nextSearchScheduledAt: string
  readonly collectingStartedAt: string | null
  readonly collectingFinishedAt: string | null
  readonly collectingCount: number
}
