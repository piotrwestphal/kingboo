import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(@Inject('RABBIT_SERVICE') private client: ClientProxy) {
  }

  sendNotification(payload): void {
    this.client.emit<any>('notifications', payload);
  }
}
