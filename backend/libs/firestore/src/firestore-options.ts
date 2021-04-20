import { EmulatorOptions } from '@kb/firestore/emulator-options'

export interface FirestoreOptions {
  readonly projectId: string
  readonly serviceAccountKeyJson?: string
  readonly emulator?: EmulatorOptions
}
