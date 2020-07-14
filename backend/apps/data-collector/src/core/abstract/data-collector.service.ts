import { CollectHotelsScenario } from '../interface/collect-hotels-scenario';

export abstract class DataCollectorService {
  abstract collectData(searchId: string,
                       updateFrequencyMinutes: number,
                       collectHotelsScenario: CollectHotelsScenario): Promise<void>;
}
