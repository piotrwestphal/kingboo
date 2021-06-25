import { Firestore, Query } from '@google-cloud/firestore'
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
    const docRef = this.firestore.collection(collection).doc(doc.docId) as DocumentReference<T>
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

  async deleteInBatch(query: Query<FirestoreDocument>,
                      batchSize: number,
                      resolve: (docIds: string[]) => void,
                      currentlyDeletedIds: string[]): Promise<string[]> {
    const snapshot = await query.limit(batchSize).get()
    if (snapshot.empty) {
      resolve(currentlyDeletedIds)
      return
    }
    const batch = this.firestore.batch()
    snapshot.docs.forEach(doc => batch.delete(doc.ref))
    await batch.commit()
    const deletedIds = snapshot.docs
      .map((v) => v.data().docId)
      .concat(currentlyDeletedIds)
    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this.deleteInBatch(query, batchSize, resolve, deletedIds)
    })
  }
}
