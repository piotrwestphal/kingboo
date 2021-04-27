import { Document } from 'mongoose'
import { SaveSearchPlaceIdentifier } from './save-search-place-identifier'

export interface SearchPlaceIdentifierDocument extends SaveSearchPlaceIdentifier, Document {
}
