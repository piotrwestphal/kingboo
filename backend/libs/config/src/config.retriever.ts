import { config as localConfig } from '../../../config/config';
import { config as devConfig } from '../../../config/config.dev';
import { config as ciConfig } from '../../../config/config.ci';
import { config as prodConfig } from '../../../config/config.prod';
import { ConfigOptions } from '@kb/config/model/config-options';

export type NodeEnv = 'dev' | 'prod' | 'ci' | 'local';

export const retrieveConfig = (processEnv: NodeJS.ProcessEnv): ConfigOptions => {
  const nodeEnv = processEnv.NODE_ENV;
  switch (nodeEnv) {
    case 'dev':
      return devConfig(processEnv);
    case 'ci':
      return ciConfig(processEnv);
    case 'prod':
      return prodConfig(processEnv);
    default: {
      console.log('Retrieving local configuration.');
      return localConfig;
    }
  }
};

