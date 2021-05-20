import { AppConfig } from '../src/config/app.config'
import { devConfig } from './dev'

export const ciConfig = (env: NodeJS.ProcessEnv): AppConfig => ({
  ...devConfig(env),
  nodeEnv: env.NODE_ENV as 'ci',
  storage: {
    remote: {
      projectId: env.GCP_STORAGE_PROJECT_ID,
      bucketName: env.GCP_STORAGE_BUCKET_NAME,
      clientEmail: env.GCP_STORAGE_CLIENT_EMAIL,
      rawClientKey: env.GCP_STORAGE_CLIENT_KEY,
    }
  },
})
