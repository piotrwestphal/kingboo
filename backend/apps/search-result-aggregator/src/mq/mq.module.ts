import { Module } from '@nestjs/common'
import { UserNotificationSender } from '../core/abstract/user-notification.sender'
import { ClientProxyFactory } from '@nestjs/microservices'
import { RmqUserNotificationSender } from './rmq-user-notification.sender'
import { AppConfigService } from '../config/app-config.service'

@Module({
  providers: [
    {
      provide: UserNotificationSender,
      useFactory: (config: AppConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.userNotificationsMqClient)
        return new RmqUserNotificationSender(clientProxy)
      },
      inject: [AppConfigService],
    },
  ],
  exports: [UserNotificationSender],
})
export class MqModule {
}
