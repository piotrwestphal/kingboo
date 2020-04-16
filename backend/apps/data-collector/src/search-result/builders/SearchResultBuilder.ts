/*
import { BuilderType, BuilderWithoutNulls, ToBuilder } from '@bo/common';
import { SearchResult } from '../interface/searchResult';
import { HotelWithId } from '../interface/hotelWithId';

export class SearchResultBuilder {
    public static get = (): BuilderType<SearchResult> =>
        (new SearchResultToBuilder() as ToBuilder<SearchResult>).toBuilder()
}

@BuilderWithoutNulls
class SearchResultToBuilder implements SearchResult {
    public searchId: string = null;
    public searchPerformedForPlace: string = null;
    public scrapingTimeSeconds: number = null;
    public searchProcessTimeSeconds: number = null;
    public hotelsCount: number = null;
    public hotels: HotelWithId[] = null;
}
*/
