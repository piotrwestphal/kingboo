import { CollectingScenarioType } from '@kb/model'
import { ScenarioRunner } from '../core/scenario.runner'

export type ScenarioRunners = { [key in CollectingScenarioType]: ScenarioRunner }
