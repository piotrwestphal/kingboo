import { CollectingScenarioType } from './collecting-scenario-type'

export interface CollectingScenarioDto {
  readonly type: CollectingScenarioType
  readonly resultsLimit: number
  readonly searchPlace: string
  readonly checkInDate: {
    readonly year: number
    readonly month: number
    readonly day: number
  }
  readonly checkOutDate: {
    readonly year: number
    readonly month: number
    readonly day: number
  }
  readonly numberOfRooms: number
  readonly numberOfAdults: number
  readonly childrenAgeAtCheckout: number[]
  readonly searchPlaceIdentifier: {
    readonly destination: string
    readonly destId: string
    readonly destType: string
    readonly placeIdLat: string
    readonly placeIdLon: string
  }
}
