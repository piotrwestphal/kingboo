import { FirestoreDocument } from '@kb/firestore'

export interface LinksDocument extends FirestoreDocument {
  readonly links: Record<string, string>
}
