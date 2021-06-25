import { FirestoreDocument } from '@kb/firestore'
import { IndexedTopHotels } from '@kb/model'

export interface TopHotelsDocument extends IndexedTopHotels, FirestoreDocument {
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
}
