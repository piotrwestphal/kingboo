import { MqMessage } from '@kb/model/mqmessage/mq-message';

export interface UserNotificationMessage<T = null> extends MqMessage {
  readonly data: T;
}
