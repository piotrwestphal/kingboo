import { Timestamp } from '@google-cloud/firestore';

export interface LinksDocument {
  readonly docId: string
  readonly createdAt: Timestamp
  readonly links: Record<string, string>
}
