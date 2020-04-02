import { RabbitOptions } from '@kb/rabbit/model/rabbit-options';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const buildRmqOptions = (rabbitOptions: RabbitOptions): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitOptions.address],
      ...rabbitOptions.queueDefinition,
    },
  };
};
