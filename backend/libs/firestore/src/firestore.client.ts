import { Firestore } from '@google-cloud/firestore'
import { FirestoreDocument } from './firestore.document'
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot
import CollectionReference = FirebaseFirestore.CollectionReference
import DocumentReference = FirebaseFirestore.DocumentReference
import WriteBatch = FirebaseFirestore.WriteBatch

export class FirestoreClient {
  constructor(
    private readonly firestore: Firestore,
  ) {
  }

  async addToCollection<T extends FirestoreDocument>(collection: string,
                                                     doc: T): Promise<DocumentSnapshot<T>> {
    const docRef = await this.firestore.collection(collection).doc(doc.docId) as DocumentReference<T>
    await docRef.set(doc);
    return docRef.get();
  }

  getAll<T>(documentReferences: Array<DocumentReference<T>>): Promise<Array<DocumentSnapshot<T>>> {
    return this.firestore.getAll(...documentReferences) as Promise<Array<DocumentSnapshot<T>>>
  }

  getCollection<T extends FirestoreDocument>(collection: string): CollectionReference<T> {
    return this.firestore.collection(collection) as CollectionReference<T>;
  }

  getBatch(): WriteBatch {
    return this.firestore.batch();
  }
}
