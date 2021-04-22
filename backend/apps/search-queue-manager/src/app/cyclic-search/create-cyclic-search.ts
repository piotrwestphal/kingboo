export interface CreateCyclicSearch {
  readonly updateFrequencyMinutes: number
  readonly resultsLimit: number
  readonly searchPlace: string
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
  readonly dayOfTheWeek: number // (0 - sunday, 1 - monday etc.)
  readonly offsetDays: number
  readonly nightsOfStay: number
  readonly beginSearchDaysBefore: number
}
