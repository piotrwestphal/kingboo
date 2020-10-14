import { TopHotelsCacheDocument } from './top-hotels-cache.document';
import { SaveTopHotelsCache } from './save-top-hotels-cache';
import { TopHotelsCache } from '../../core/model/TopHotelsCache';

export class TopHotelsCacheDocumentMapper {

  toTopHotels({
                searchId,
                collectingStartedAt,
                collectingFinishedAt,
                topHotels,
                updatedAt,
              }: TopHotelsCacheDocument): TopHotelsCache {
    return new TopHotelsCache(
      searchId,
      collectingStartedAt,
      collectingFinishedAt,
      topHotels,
      new Date(updatedAt),
    )
  }

  prepareForSave({
                   searchId,
                   collectingStartedAt,
                   collectingFinishedAt,
                   topHotels,
                 }: TopHotelsCache): SaveTopHotelsCache {
    return {
      searchId,
      collectingStartedAt,
      collectingFinishedAt,
      topHotels,
    };
  }
}
