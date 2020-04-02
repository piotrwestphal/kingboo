import { ConfigService, FaunaAdminDbOptions } from '@kb/config';
import { MainConfig } from './main.config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { FaunaClientConfigService } from '@kb/fauna-client';
import { mainConfigValidationSchemaMap } from './validation.schema';

export class MainConfigService extends ConfigService<MainConfig> implements FaunaClientConfigService {

  constructor(mainConfig: MainConfig) {
    super(mainConfig, mainConfigValidationSchemaMap);
  }

  get faunaDbName(): string {
    return this.config.db.dbName;
  }

  get faunaSecret(): string {
    const secret = this.config.db.secret;
    if (!secret) {
      throw new Error('Fauna secret not found.');
    }
    return secret;
  }

  get faunaAdminDbOptions(): FaunaAdminDbOptions {
    const options = this.config.db.faunaAdminDb;
    if (!options) {
      throw new Error(`Options for fauna admin db not found.`);
    }
    return options;
  }

  get mqClient(): RmqOptions {
    return buildRmqOptions(this.config.mqClient);
  }
}
