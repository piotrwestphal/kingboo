import {ChildrenPropertiesDocument} from './childrenProperties.document';
import {CheckDateDocument} from './checkDate.document';

export interface SearchRequestDocument {
    readonly priority: number;
    readonly updateFrequencyMinutes: number;
    readonly resultsLimit: number;
    // Scenario parameters
    readonly city: string;
    readonly checkInDate: CheckDateDocument;
    readonly checkOutDate: CheckDateDocument;
    readonly numberOfRooms: number;
    readonly numberOfAdults: number;
    readonly numberOfChildren: ChildrenPropertiesDocument[];
}
