import { CollectingScenarioType } from '@kb/model'

export interface CyclicIdentifierComponents {
  readonly scenarioType: CollectingScenarioType
  readonly updateFrequencyMinutes: number
  readonly resultsLimit: number
  readonly searchPlace: string
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
  readonly dayOfTheWeek: number
  readonly nightsOfStay: number
  readonly beginSearchDaysBefore: number
}
