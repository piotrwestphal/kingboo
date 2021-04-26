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

  public static readonly DEST_ID_INPUT: PageElement = {
    selector: '#frm > input[name="dest_id"]',
    description: MainPageElement.constructDescription('Destination id input'),
  };

  public static readonly DEST_TYPE_INPUT: PageElement = {
    selector: '#frm > input[name="dest_type"]',
    description: MainPageElement.constructDescription('Destination type input'),
  };

  public static readonly PLACE_ID_LAT_INPUT: PageElement = {
    selector: '#frm > input[name="place_id_lat"]',
    description: MainPageElement.constructDescription('Place id lat input'),
  };

  public static readonly PLACE_ID_LON_INPUT: PageElement = {
    selector: '#frm > input[name="place_id_lon"]',
    description: MainPageElement.constructDescription('Place id lon input'),
  };

  public static readonly SUBMIT_BUTTON: PageElement = {
    selector: '#frm div.xp__button',
    description: MainPageElement.constructDescription('Submit button'),
  };
}
