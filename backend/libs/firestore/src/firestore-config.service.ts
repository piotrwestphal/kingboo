import { NodeEnv } from '@kb/config'
import { EmulatorOptions } from '@kb/firestore/emulator-options'

export interface FirestoreConfigService {
  env: NodeEnv
  emulator: EmulatorOptions
  projectId: string
  clientEmail: string
  rawClientKey: string
}
