import { CollectingScenario } from './collecting-scenario'
import { CollectingScenarioType } from '@kb/model'

export interface HotelsCollectingScenario extends CollectingScenario {
  readonly type: CollectingScenarioType.COLLECT_PLACE
  readonly resultsLimit: number
}
