import { InconsistencyException } from '../exception/InconsistencyException';

type ScrapActivityValues = Omit<ScrapActivity, 'start' | 'finish'>

export class ScrapActivity {
  constructor(
    public readonly searchId: string,
    public scrapStartedAt: Date = null,
    public scrapFinishedAt: Date = null,
  ) {
  }

  static create({
                  searchId,
                  scrapStartedAt,
                  scrapFinishedAt
                }: ScrapActivityValues): ScrapActivity {
    return new ScrapActivity(
      searchId,
      scrapStartedAt,
      scrapFinishedAt,
    )
  }

  start() {
    this.scrapStartedAt = new Date();
    this.scrapFinishedAt = null;
  }

  finish() {
    if (this.scrapFinishedAt) {
      throw new InconsistencyException('Scrap activity already finished');
    }
    this.scrapFinishedAt = new Date();
  }
}
