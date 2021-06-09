import { CollectingScenario } from './collecting-scenario'
import { CollectingScenarioType } from '@kb/model'

export interface PlaceCollectingScenario extends CollectingScenario {
  readonly type: CollectingScenarioType.COLLECT_PLACE
  readonly resultsLimit: 1
}
