export interface PuppeteerOptions {
  readonly headlessModeOff: boolean;
  readonly enableStylesOnResultsPage: boolean;
  readonly executablePath?: string;
  readonly slowMoMs?: number;
  readonly devtoolsTurnedOn?: boolean;
}
