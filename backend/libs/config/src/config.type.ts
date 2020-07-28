import { CommonConfig } from '@kb/config/model/common-config';
import { ConfigService } from '@kb/config/config.service';
import { CommonLoggerService } from '@kb/logger';

export interface ConfigType<T extends CommonConfig, K extends ConfigService<T>> {
  new(config: T, logger: CommonLoggerService): K;
}
