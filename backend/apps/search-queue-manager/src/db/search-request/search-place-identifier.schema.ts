import { Schema } from 'mongoose';
import { SearchPlaceIdentifierDocument } from './search-place-identifier.document'

export const SearchPlaceIdentifierSchema = new Schema<SearchPlaceIdentifierDocument>({
    destination: String,
    destId: String,
    destType: String,
    placeIdLat: String,
    placeIdLon: String,
  },
  {
    _id: false,
    versionKey: false,
  });
