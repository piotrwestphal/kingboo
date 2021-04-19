interface FoundDifferences {
  readonly searchIdsToCreate: string[]
  readonly searchIdsToDelete: string[];
  readonly differencesFound: boolean;
}

export class DifferenceFinder {
  find(current: string[], existing: string[]): FoundDifferences {
    const searchIdsToCreate = current.filter(v => !existing.includes(v));
    const searchIdsToDelete = existing.filter(v => !current.includes(v));
    return {
      differencesFound: searchIdsToCreate.length !== 0 || searchIdsToDelete.length !== 0,
      searchIdsToCreate,
      searchIdsToDelete,
    };
  }
}
