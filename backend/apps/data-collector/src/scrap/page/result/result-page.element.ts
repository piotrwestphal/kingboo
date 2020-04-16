import { PageElement } from '../../interface/page-element';

export class ResultPageElement {

  private static readonly BASE_ELEMENT_DESCRIPTION = 'Search Result Page';
  private static constructDescription = (selectorDescription: string) =>
    `${selectorDescription} on ${ResultPageElement.BASE_ELEMENT_DESCRIPTION}`;

  public static readonly TITLE: PageElement = {
    selector: '.sr_header',
    description: ResultPageElement.constructDescription('Title'),
  };

  public static readonly LOADER_WINDOW: PageElement = {
    selector: 'div.sr-usp-overlay',
    description: ResultPageElement.constructDescription('Loader window'),
  };

  public static readonly NEXT_PAGE_BUTTON: PageElement = {
    selector: '.paging-next',
    description: ResultPageElement.constructDescription('Next page button'),
  };

  public static readonly SECURITY_CHECK_OVERLAY: PageElement = {
    selector: '#mlb__overlay',
    description: ResultPageElement.constructDescription('Security check overlay'),
  };

  public static readonly SECURITY_CHECK_CONFIRM_CHECKBOX: PageElement = {
    selector: '#mlb__btn',
    description: ResultPageElement.constructDescription('Security check confirm button'),
  };
}
