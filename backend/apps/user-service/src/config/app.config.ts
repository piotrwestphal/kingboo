import { CommonConfig } from '@kb/config'
import { FirestoreConfig } from '@kb/firestore'

export interface AppConfig extends CommonConfig, FirestoreConfig {
  readonly searchRequestsResourceAddress: string
}
