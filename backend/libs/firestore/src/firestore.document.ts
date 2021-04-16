import { Timestamp } from "@google-cloud/firestore";

export interface FirestoreDocument {
  readonly docId: string
  readonly searchId: string
  readonly createdAt: Timestamp
}
