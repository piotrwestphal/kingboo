import { Firestore } from '@google-cloud/firestore';
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import CollectionReference = FirebaseFirestore.CollectionReference;
import DocumentReference = FirebaseFirestore.DocumentReference;
import WriteBatch = FirebaseFirestore.WriteBatch;
import { FirestoreDocument } from '../../../apps/data-collector/src/db/firestore.document';

export class FirestoreClient {
  constructor(
    private readonly firestore: Firestore,
  ) {
  }

  async addToCollection<T>(collection: string,
                           docId: string,
                           doc: T): Promise<DocumentSnapshot<T>> {
    const docRef = await this.firestore.collection(collection).doc(docId) as DocumentReference<T>;
    await docRef.set(doc);
    return docRef.get();
  }

  getCollection<T extends FirestoreDocument>(collection: string): CollectionReference<T> {
    return this.firestore.collection(collection) as CollectionReference<T>;
  }

  getBatch(): WriteBatch {
    return this.firestore.batch();
  }
}
