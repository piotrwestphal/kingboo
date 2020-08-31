import { MqMessage } from '@kb/model';

export interface ScrapingFinishedMessage extends MqMessage {
  readonly scrapingStartedAt: string;
  readonly scrapingFinishedAt: string;
}
