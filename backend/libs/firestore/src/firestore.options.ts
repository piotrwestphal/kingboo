export interface FirestoreOptions {
  readonly projectId: string;
  readonly clientEmail?: string;
  readonly clientKey?: string;
  readonly emulator?: {
    readonly host: string;
    readonly port: number;
  }
}
