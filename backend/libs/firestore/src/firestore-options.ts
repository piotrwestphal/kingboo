import { EmulatorOptions } from '@kb/firestore/emulator-options'

export interface FirestoreOptions {
  readonly projectId: string
  readonly clientEmail?: string
  readonly rawClientKey?: string
  readonly emulator?: EmulatorOptions
}
