import { Firestore } from '@google-cloud/firestore';
import DocumentReference = FirebaseFirestore.DocumentReference;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;

export class FirestoreClient {
  constructor(
    private readonly firestore: Firestore,
  ) {
  }

  async addToCollection<T>(collection: string, doc: T): Promise<DocumentSnapshot<T>> {
    const docRef = await this.firestore.collection(collection).add(doc) as DocumentReference<T>;
    return docRef.get();
  }
}
