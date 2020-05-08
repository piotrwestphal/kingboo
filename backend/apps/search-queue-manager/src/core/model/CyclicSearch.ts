type CyclicSearchValues = Omit<CyclicSearch, 'updateCyclicSearchRequests'>

export class CyclicSearch {

  private constructor(
    public readonly cyclicId: string,
    public readonly priority: number,
    public readonly updateFrequencyMinutes: number,
    public readonly resultsLimit: number,
    public readonly searchPlace: string,
    public readonly numberOfRooms: number,
    public readonly numberOfAdults: number,
    public readonly childrenAgeAtCheckout: number[],
    public readonly dayOfTheWeek: number,
    public readonly nightsOfStay: number,
    public readonly beginSearchDaysBefore: number,
    public readonly cyclicSearchRequests: string[],
  ) {
  }

  static create({
                  cyclicId,
                  priority,
                  updateFrequencyMinutes,
                  resultsLimit,
                  searchPlace,
                  numberOfRooms,
                  numberOfAdults,
                  childrenAgeAtCheckout,
                  dayOfTheWeek,
                  nightsOfStay,
                  beginSearchDaysBefore,
                  cyclicSearchRequests,
                }: CyclicSearchValues): CyclicSearch {
    return new CyclicSearch(
      cyclicId,
      priority,
      updateFrequencyMinutes,
      resultsLimit,
      searchPlace,
      numberOfRooms,
      numberOfAdults,
      childrenAgeAtCheckout,
      dayOfTheWeek,
      nightsOfStay,
      beginSearchDaysBefore,
      cyclicSearchRequests,
    );
  }


  updateCyclicSearchRequests(cyclicSearchIds: string[]) {
    this.cyclicSearchRequests.length = 0;
    this.cyclicSearchRequests.push(...cyclicSearchIds);
    return this;
  }
}
