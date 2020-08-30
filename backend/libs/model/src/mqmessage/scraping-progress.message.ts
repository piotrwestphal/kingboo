import { MqMessage } from '@kb/model';

export interface ScrapingProgressMessage extends MqMessage {
  readonly scrapingStartedAt: string;
  readonly scrapingFinishedAt: string | null;
}
