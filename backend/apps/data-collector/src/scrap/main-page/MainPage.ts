import { PageElement } from '../interface/pageElement';

export class MainPage {

    private static readonly BASE_ELEMENT_DESCRIPTION = 'Main Page';
    private static constructDescription = (selectorDescription: string) => `${selectorDescription} on ${MainPage.BASE_ELEMENT_DESCRIPTION}`;

    public static readonly DESTINATION_INPUT: PageElement = {
        selector: '#ss',
        description: MainPage.constructDescription('Destination input'),
    };

    public static readonly AUTOCOMPLETE_LIST_CONTAINER: PageElement = {
        selector: '.c-autocomplete.sb-destination > ul',
        description: MainPage.constructDescription('Autocomplete list container'),
    };

    public static readonly FIRST_ELEMENT_ON_AUTOCOMPLETE_LIST: PageElement = {
        selector: '.c-autocomplete.sb-destination > ul > li',
        description: MainPage.constructDescription('First element on autocomplete list'),
    };
}
