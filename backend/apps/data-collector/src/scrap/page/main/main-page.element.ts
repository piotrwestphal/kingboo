import { PageElement } from '../../interface/page-element';

export class MainPageElement {

  private static readonly BASE_ELEMENT_DESCRIPTION = 'Main Page';
  private static constructDescription = (selectorDescription: string) => `${selectorDescription} on ${MainPageElement.BASE_ELEMENT_DESCRIPTION}`;

  public static readonly DESTINATION_INPUT: PageElement = {
    selector: '#ss',
    description: MainPageElement.constructDescription('Destination input'),
  };

  public static readonly AUTOCOMPLETE_LIST_CONTAINER: PageElement = {
    selector: '.c-autocomplete.sb-destination > ul',
    description: MainPageElement.constructDescription('Autocomplete list container'),
  };

  public static readonly FIRST_ELEMENT_ON_AUTOCOMPLETE_LIST: PageElement = {
    selector: '.c-autocomplete.sb-destination > ul > li',
    description: MainPageElement.constructDescription('First element on autocomplete list'),
  };
}
