import { CollectingScenarioType } from '@kb/model'

export abstract class DataUpdateSender {
  abstract notifyAboutDeletedSearchRequest(searchId: string, scenarioType: CollectingScenarioType): void
}
