import { SearchRequestType } from '../model/SearchRequestType'
import { CollectingScenarioType } from '@kb/model'

export interface SearchIdentifierComponents {
  readonly type: SearchRequestType
  readonly scenarioType: CollectingScenarioType
  readonly searchPlace: string
  readonly checkInDate: Date
  readonly checkOutDate: Date
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
  readonly updateFrequencyMinutes: number
  readonly resultsLimit: number
}
