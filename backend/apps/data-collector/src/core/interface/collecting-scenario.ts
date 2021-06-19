import { CheckDate } from './check-date'
import { CollectingScenarioType } from '@kb/model'

export interface CollectingScenario {
  readonly type: CollectingScenarioType
  readonly resultsLimit: number
  readonly searchPlace: string
  readonly checkInDate: CheckDate
  readonly checkOutDate: CheckDate
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
}
