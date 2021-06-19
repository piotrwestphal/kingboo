import { CollectingScenarioType } from '@kb/model'

export interface CreateSearchRequest {
  readonly scenarioType: CollectingScenarioType
  readonly updateFrequencyMinutes: number
  readonly resultsLimit?: number
  readonly searchPlace: string
  readonly checkInDate: Date
  readonly checkOutDate: Date
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
}
