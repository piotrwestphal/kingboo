import { InconsistencyException } from '../exception/InconsistencyException';

type ScrapActivityValues = Omit<ScrapActivity, 'start' | 'finish'>

export class ScrapActivity {
  constructor(
    public readonly searchId: string,
    public scrapingStartedAt: Date = null,
    public scrapingFinishedAt: Date = null,
  ) {
  }

  static create({
                  searchId,
                  scrapingStartedAt,
                  scrapingFinishedAt
                }: ScrapActivityValues): ScrapActivity {
    return new ScrapActivity(
      searchId,
      scrapingStartedAt,
      scrapingFinishedAt,
    )
  }

  start(): void {
    this.scrapingStartedAt = new Date();
    this.scrapingFinishedAt = null;
  }

  finish(): void {
    if (this.scrapingFinishedAt) {
      throw new InconsistencyException('Scrap activity already finished');
    }
    this.scrapingFinishedAt = new Date();
  }
}
