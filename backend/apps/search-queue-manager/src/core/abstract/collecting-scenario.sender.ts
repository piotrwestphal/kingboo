import { SearchRequest } from '../model/SearchRequest';

export abstract class CollectingScenarioSender {
  abstract sendScenario(searchRequest: SearchRequest): void;
}
