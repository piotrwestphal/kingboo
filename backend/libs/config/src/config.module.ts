import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { retrieveConfig } from '@kb/config/config.retriever';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: (): ConfigService => {
        const configOptions = retrieveConfig(process.env);
        return new ConfigService(configOptions);
      },
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {
  // TODO: add possibility to add config specific to app
}
