import { Module } from '@nestjs/common';
import { SearchRequestSender } from '../core/interface/search-request.sender';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { RMQSearchRequestSender } from './rmq.search-request.sender';
import { MainConfigService } from '../main-config.service';

const RMQ_CLIENT_PROXY_TOKEN = 'RMQ_CLIENT_PROXY';

@Module({
  providers: [
    {
      provide: RMQ_CLIENT_PROXY_TOKEN,
      useFactory: (config: MainConfigService) => {
        return ClientProxyFactory.create(config.mqClient);
      },
      inject: [MainConfigService],
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
