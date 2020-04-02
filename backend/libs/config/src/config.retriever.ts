import { Environments } from '@kb/config/model/environments';

export type NodeEnv = 'dev' | 'prod' | 'ci' | 'local';

export const getConfigBasedOnEnv = <T>(processEnv: NodeJS.ProcessEnv,
                                       envs: Environments<T>): T => {
  const nodeEnv = processEnv.NODE_ENV;
  switch (nodeEnv) {
    case 'dev':
      return envs.dev(processEnv);
    case 'ci':
      return envs.ci(processEnv);
    case 'prod':
      return envs.prod(processEnv);
    default: {
      console.log('Retrieving local configuration.');
      return envs.local;
    }
  }
};

