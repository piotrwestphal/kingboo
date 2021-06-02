import { MqMessage } from '@kb/model/mqmessage/mq-message'
import { CollectingScenarioDto } from '@kb/model'

export interface CollectHotelsScenarioMessage extends MqMessage {
  readonly updateFrequencyMinutes: number,
  readonly scenario: CollectingScenarioDto
}
