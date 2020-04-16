import { CollectHotelsScenario } from '../interface/collect-hotels-scenario';

export abstract class DataCollectorService {
  abstract collectData(collectHotelsScenario: CollectHotelsScenario): Promise<void>;
}
