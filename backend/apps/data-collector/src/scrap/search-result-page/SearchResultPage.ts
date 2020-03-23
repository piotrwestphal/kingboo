import { PageElement } from '../interface/pageElement';

export class SearchResultPage {

    private static readonly BASE_ELEMENT_DESCRIPTION = 'Search Result Page';
    private static constructDescription = (selectorDescription: string) =>
        `${selectorDescription} on ${SearchResultPage.BASE_ELEMENT_DESCRIPTION}`

    public static readonly TITLE: PageElement = {
        selector: '.sr_header',
        description: SearchResultPage.constructDescription('Title'),
    };

    public static readonly LOADER_WINDOW: PageElement = {
        selector: 'div.sr-usp-overlay',
        description: SearchResultPage.constructDescription('Loader window'),
    };

    public static readonly NEXT_PAGE_BUTTON: PageElement = {
        selector: '.paging-next',
        description: SearchResultPage.constructDescription('Next page button'),
    };

    public static readonly SECURITY_CHECK_OVERLAY: PageElement = {
        selector: '#mlb__overlay',
        description: SearchResultPage.constructDescription('Security check overlay'),
    };

    public static readonly SECURITY_CHECK_CONFIRM_CHECKBOX: PageElement = {
        selector: '#mlb__btn',
        description: SearchResultPage.constructDescription('Security check confirm button'),
    };
}
