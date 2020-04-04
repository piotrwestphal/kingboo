import { ClientProxy } from '@nestjs/microservices';
import { SearchRequestSender } from '../core/interface/search-request.sender';

export class RMQSearchRequestSender extends SearchRequestSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  send(payload): void {
    this.client.emit<any>('notifications', payload);
  }
}
