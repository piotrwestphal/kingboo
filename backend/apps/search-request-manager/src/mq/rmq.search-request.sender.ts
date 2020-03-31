import { ClientProxy } from '@nestjs/microservices';

export class RMQSearchRequestSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
  }

  sendNotification(payload): void {
    this.client.emit<any>('notifications', payload);
  }
}
