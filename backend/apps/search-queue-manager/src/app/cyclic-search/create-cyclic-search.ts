import { CollectingScenarioType } from '@kb/model'

export interface CreateCyclicSearch {
  readonly scenarioType: CollectingScenarioType
  readonly updateFrequencyMinutes: number
  readonly resultsLimit: number
  readonly searchPlace: string
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
  readonly dayOfTheWeek: number // (0 - sunday, 1 - monday etc.)
  readonly nightsOfStay: number
  readonly beginSearchDaysBefore: number
}
