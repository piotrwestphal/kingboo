import { CommonConfig } from '@kb/config/model/common-config';
import { CommonConfigService } from '@kb/config/common-config.service';

export interface ConfigType<T extends CommonConfigService> {
  new(commonConfig: CommonConfig): T;
}
