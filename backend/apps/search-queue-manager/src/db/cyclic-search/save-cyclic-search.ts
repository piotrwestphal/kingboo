export interface SaveCyclicSearch {

  readonly cyclicId: string
  readonly updateFrequencyMinutes: number
  readonly resultsLimit: number

  readonly searchPlace: string
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]

  readonly dayOfTheWeek: number
  readonly nightsOfStay: number
  readonly beginSearchDaysBefore: number
  readonly cyclicSearchRequests: string[]
}
