import { RawSearchResult } from '../../core/model/RawSearchResult'
import { RawSearchResultDocument } from './raw-search-result.document'
import { RawHotel } from '../../core/model/RawHotel'
import { RawHotelDocument } from './raw-hotel.document'

export class RawSearchResultMapper {
  toDoc({
          searchId,
          searchPlaceIdentifier,
          collectingTimeSec,
          hotelsCount,
        }: RawSearchResult,
        hotels: RawHotelDocument[]): RawSearchResultDocument {
    return {
      searchId,
      searchPlaceIdentifier,
      collectingTimeSec,
      hotelsCount,
      hotels,
      createdAt: new Date(),
    }
  }

  fromDoc({
            searchId,
            searchPlaceIdentifier,
            hotelsCount,
            collectingTimeSec,
          }: RawSearchResultDocument,
          hotels: RawHotel[]) {
    return new RawSearchResult(
      searchId,
      searchPlaceIdentifier,
      hotels,
      hotelsCount,
      collectingTimeSec,
    )
  }
}
