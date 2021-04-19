import { FirestoreDocument } from '@kb/firestore'
import { TopHotelsDto } from '@kb/model'

export interface TopHotelsDocument extends TopHotelsDto, FirestoreDocument {
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
}
