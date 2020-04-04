import { CollectingScenarioSender } from '../core/interface/collecting-scenario.sender';
import { ClientProxy } from '@nestjs/microservices';

export class RmqCollectingScenarioSender extends CollectingScenarioSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  send(payload: any): void {
    this.client.send('DUPA', payload);
  }
}
