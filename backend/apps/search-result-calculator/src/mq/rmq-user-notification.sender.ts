import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { ClientProxy } from '@nestjs/microservices';

export class RmqUserNotificationSender extends UserNotificationSender {
  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }
  // TODO: finish
}
