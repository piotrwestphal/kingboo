import { Firestore } from '@google-cloud/firestore';

export class FirestoreClient {
  constructor(
    private readonly firestore: Firestore,
  ) {
  }
}
