import { MqMessage } from '@kb/model/mqmessage/mq-message';
import { CollectHotelsScenarioDto } from '@kb/model/collect-hotels-scenario.dto';

export interface CollectHotelsScenarioMessage extends MqMessage {
  readonly updateFrequencyMinutes: number,
  readonly scenario: CollectHotelsScenarioDto;
}
