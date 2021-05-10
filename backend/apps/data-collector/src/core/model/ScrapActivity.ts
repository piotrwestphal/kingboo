import { InconsistencyException } from '../exception/InconsistencyException';

export class ScrapActivity {
  constructor(
    public readonly searchId: string,
    public scrapingStartedAt: Date = null,
    public scrapingFinishedAt: Date = null,
  ) {
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
