import { localConfig } from '../../env/local'
import { devConfig } from '../../env/dev'
import { prodConfig } from '../../env/prod'
import { Environments } from '@kb/config/model/environments'
import { AppConfig } from './app.config'

export const getEnvironments = (): Environments<AppConfig> => ({
  local: localConfig,
  dev: devConfig,
  ci: devConfig,
  prod: prodConfig,
})
