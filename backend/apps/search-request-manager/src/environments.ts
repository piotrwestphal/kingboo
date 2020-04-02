import { localConfig } from '../env/local';
import { devConfig } from '../env/dev';
import { prodConfig } from '../env/prod';
import { Environments } from '@kb/config/model/environments';
import { MainConfig } from './main.config';

export const getEnvironments = (): Environments<MainConfig> => ({
  local: localConfig,
  dev: devConfig,
  ci: devConfig,
  prod: prodConfig,
});
