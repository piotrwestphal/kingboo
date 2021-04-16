import { Document } from 'mongoose'
import { SaveSearchRequest } from './save-search-request'

export interface SearchPlaceIdentifierDocument extends SaveSearchRequest, Document {
}
