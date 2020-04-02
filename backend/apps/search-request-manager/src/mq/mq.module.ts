import { Module } from '@nestjs/common';
import { SearchRequestSender } from '../core/interface/search-request.sender';
import { ClientProxy, ClientProxyFactory, RmqOptions, Transport } from '@nestjs/microservices';
import { RMQSearchRequestSender } from './rmq.search-request.sender';
import { CommonConfigService } from '@kb/config';

const RMQ_CLIENT_PROXY_TOKEN = 'RMQ_CLIENT_PROXY';

@Module({
  providers: [
    {
      provide: RMQ_CLIENT_PROXY_TOKEN,
      useFactory: (config: CommonConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options:  config.rmqClientOptions,
        } as RmqOptions);
      },
      inject: [CommonConfigService],
    },
    {
      provide: SearchRequestSender,
      useFactory: (clientProxy: ClientProxy) => {
        return new RMQSearchRequestSender(clientProxy);
      },
      inject: [RMQ_CLIENT_PROXY_TOKEN],
    },
  ],
  exports: [SearchRequestSender],
})
export class MqModule {
}
