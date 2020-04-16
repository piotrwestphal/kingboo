import { MqMessage } from '@kb/model/mqmessage/mq-message';

export interface UserNotificationMessage extends MqMessage {
  readonly userId: string;
}
