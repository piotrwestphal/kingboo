import { SearchRequest } from '../../core/model/SearchRequest'

interface FoundDifferences {
  readonly searchReqsToCreate: SearchRequest[]
  readonly searchReqsToDelete: SearchRequest[]
  readonly differencesFound: boolean
}

export class DifferenceFinder {
  find(currentReqs: SearchRequest[], existingReqs: SearchRequest[]): FoundDifferences {
    const searchReqsToCreate = currentReqs.filter(current => !existingReqs.map(v => v.searchId).includes(current.searchId))
    const searchReqsToDelete = existingReqs.filter(existing => !currentReqs.map(v => v.searchId).includes(existing.searchId))
    return {
      differencesFound: searchReqsToCreate.length !== 0 || searchReqsToDelete.length !== 0,
      searchReqsToCreate,
      searchReqsToDelete,
    }
  }
}
