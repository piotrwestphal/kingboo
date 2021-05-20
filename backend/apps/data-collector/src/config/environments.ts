import { localConfig } from '../../env/local';
import { devConfig } from '../../env/dev';
import { prodConfig } from '../../env/prod';
import { Environments } from '@kb/config';
import { AppConfig } from './app.config';
import { ciConfig } from '../../env/ci'

export const getEnvironments = (): Environments<AppConfig> => ({
  local: localConfig,
  dev: devConfig,
  ci: ciConfig,
  prod: prodConfig,
});
