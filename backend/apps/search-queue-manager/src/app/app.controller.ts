import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor() {
  }

  @MessagePattern('notifications')
  getNotifications(@Payload() data: any, @Ctx() ctx: RmqContext) {
    console.log('notifications: ', {
      data,
      pattern: ctx.getPattern(),
      ctx,
      args: ctx.getArgs(),
    });
    const originalMessage = ctx.getMessage();
    const channel = ctx.getChannelRef();
    setTimeout(() => {
      console.log('Send ACK: ', data);
      channel.ack(originalMessage);
    }, 30000);
  }
}
