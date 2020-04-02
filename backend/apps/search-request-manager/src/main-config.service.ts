import { CommonConfigService, FaunaAdminDbOptions } from '@kb/config';
import { MainConfig } from './main.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';

export class MainConfigService extends CommonConfigService {

  private readonly mainConfig: MainConfig;

  constructor(mainConfig: MainConfig) {
    super(mainConfig);
    this.mainConfig = this.validate(null, mainConfig);
  }

  get faunaSecret(): string {
    const secret = this.mainConfig.db.secret;
    if (!secret) {
      throw new Error('Fauna secret not found.');
    }
    return secret;
  }

  get faunaAdminDbOptions(): FaunaAdminDbOptions {
    const options = this.mainConfig.db.faunaAdminDb;
    if (!options) {
      throw new Error(`Options for fauna admin db not found.`);
    }
    return options;
  }

  get mqClient(): RmqOptions {
    return buildRmqOptions(this.mainConfig.mqClient);
  }
}
