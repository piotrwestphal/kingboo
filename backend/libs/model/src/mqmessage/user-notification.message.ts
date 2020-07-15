import { MqMessage } from '@kb/model/mqmessage/mq-message';

export interface UserNotificationMessage<T> extends MqMessage {
  readonly data: T;
}
