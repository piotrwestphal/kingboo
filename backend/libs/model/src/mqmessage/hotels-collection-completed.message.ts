import { MqMessage } from '@kb/model/mqmessage/mq-message';

export interface HotelsCollectionCompletedMessage extends MqMessage {
  readonly collectingTimeSec: number;
}
