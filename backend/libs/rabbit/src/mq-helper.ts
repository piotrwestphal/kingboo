import { RmqContext } from '@nestjs/microservices'

export const mqAck = (context: RmqContext): void => {
  const channel = context.getChannelRef()
  const originalMsg = context.getMessage()
  channel.ack(originalMsg)
}
