import { FirestoreDocument } from '../firestore.document';

export interface LinksDocument extends FirestoreDocument {
  readonly links: Record<string, string>
}
