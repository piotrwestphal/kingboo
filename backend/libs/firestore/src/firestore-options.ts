import { EmulatorOptions } from '@kb/firestore/emulator-options'

export interface FirestoreOptions {
  readonly projectId: string
  readonly keyFilename?: string
  readonly emulator?: EmulatorOptions
}
