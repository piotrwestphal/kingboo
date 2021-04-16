import { Module } from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'
import { DataUpdateSender } from '../core/abstract/data-update.sender'
import { AppConfigService } from '../config/app-config.service'
import { RmqDataUpdateSender } from './rmq-data-update.sender'

@Module({
  providers: [
    {
      provide: DataUpdateSender,
      useFactory: (config: AppConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.dataUpdatesMqClient)
        return new RmqDataUpdateSender(clientProxy)
      },
      inject: [AppConfigService],
    },
  ],
  exports: [DataUpdateSender],
})
export class MqModule {}
