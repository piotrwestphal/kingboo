export interface PuppeteerOptions {
  readonly headlessModeOff: boolean;
  readonly executablePath?: string;
  readonly slowMoMs?: number;
  readonly devtoolsTurnedOn?: boolean;
}
