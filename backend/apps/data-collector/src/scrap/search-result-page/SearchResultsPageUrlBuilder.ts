import { Injectable } from '@nestjs/common';
import { SearchRequestDocument } from '../../model/document/searchRequest.document';
import { CheckDateDocument } from '../../model/document/checkDate.document';
import { ChildrenPropertiesDocument } from '../../model/document/childrenProperties.document';

@Injectable()
export class SearchResultsPageUrlBuilder {

    private readonly SEARCH_RESULTS_PAGE = '/searchresults.en-gb.html';
    private readonly START_QUERY_MARK = '?';
    private readonly SEPARATE_PARAM_MARK = '&';
    private readonly SEARCH_PLACE_KEY = 'ss=';

    private readonly CHECKIN_PREFIX_PARAM = 'checkin_';
    private readonly CHECKOUT_PREFIX_PARAM = 'checkout_';
    private readonly YEAR_SUFFIX_KEY = 'year=';
    private readonly MONTH_SUFFIX_KEY = 'month=';
    private readonly MONTHDAY_SUFFIX_KEY = 'monthday=';

    private readonly NUMBER_OF_ADULTS_KEY = 'group_adults=';
    private readonly NUMBER_OF_ROOMS_KEY = 'no_rooms=';
    private readonly NUMBER_OF_CHILDREN_KEY = 'group_children=';
    private readonly CHILDREN_AGE_KEY = 'age=';

    private readonly SORT_BY_DISTANCE_PARAM = 'order=distance_from_search';
    private readonly SHOW_ONLY_AVAILABLE_PROPERTIES_FILTER_PARAM = 'nflt=oos%3D1%3B';

    fromSearchPlaceNameAndSearchRequest(processedSearchPlaceName: string, {
        checkOutDate,
        checkInDate,
        numberOfAdults,
        numberOfRooms,
        numberOfChildren,
    }: SearchRequestDocument): string {
        const encodedProcessedSearchPlaceName = encodeURIComponent(processedSearchPlaceName);
        const searchPlaceParam = `${this.SEARCH_PLACE_KEY}${encodedProcessedSearchPlaceName}`;
        const checkinDateParams = this.combineDate(this.CHECKIN_PREFIX_PARAM, checkInDate);
        const checkoutDateParams = this.combineDate(this.CHECKOUT_PREFIX_PARAM, checkOutDate);
        const numberOfAdultsParam = `${this.NUMBER_OF_ADULTS_KEY}${numberOfAdults}`;
        const numberOfRoomsParam = `${this.NUMBER_OF_ROOMS_KEY}${numberOfRooms}`;
        const numberOfChildrenParam = `${this.NUMBER_OF_CHILDREN_KEY}${numberOfChildren.length}`;
        const childrenAgeParams = this.combineChildrenAge(numberOfChildren);
        const queryParams: string = [
            searchPlaceParam,
            ...checkinDateParams,
            ...checkoutDateParams,
            numberOfAdultsParam,
            numberOfRoomsParam,
            numberOfChildrenParam,
            ...childrenAgeParams,
            this.SORT_BY_DISTANCE_PARAM,
            this.SHOW_ONLY_AVAILABLE_PROPERTIES_FILTER_PARAM,
        ].reduce((p, c) => `${p}${this.SEPARATE_PARAM_MARK}${c}`);
        return `${this.SEARCH_RESULTS_PAGE}${this.START_QUERY_MARK}${queryParams}`;
    }

    private combineDate = (prefix: string, { year, month, day }: CheckDateDocument): string[] =>
        [
            `${this.YEAR_SUFFIX_KEY}${year}`,
            `${this.MONTH_SUFFIX_KEY}${month}`,
            `${this.MONTHDAY_SUFFIX_KEY}${day}`,
        ].map((v) => `${prefix}${v}`)

    private combineChildrenAge = (numberOfChildren: ChildrenPropertiesDocument[]): string[] =>
        numberOfChildren.map((v) => `${this.CHILDREN_AGE_KEY}${v.yearAgeAtCheckOut}`)

}
