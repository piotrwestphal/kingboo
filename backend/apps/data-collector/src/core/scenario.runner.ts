import { CollectingScenario } from './interface/collecting-scenario'
import { SearchPlaceIdentifier } from './interface/search-place-identifier'

export interface ScenarioRunner {
  run(searchId: string,
      collectingScenario: CollectingScenario,
      searchPlaceIdentifier: SearchPlaceIdentifier,
      startedAt: Date): Promise<Date>
}
