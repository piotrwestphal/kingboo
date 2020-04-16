import { MqMessage } from '@kb/model/mqmessage/mq-message';

export interface SearchPlaceCollectionCompletedMessage extends MqMessage {
  readonly searchPlaceIdentifier: string;
}
