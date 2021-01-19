import { Timestamp } from "@google-cloud/firestore";

export interface FirestoreDocument {
  readonly docId: string
  readonly createdAt: Timestamp
}
