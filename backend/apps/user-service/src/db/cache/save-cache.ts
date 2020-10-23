export interface SaveCache<T = any> {
  readonly searchId: string;
  readonly collectingStartedAt: string;
  readonly collectingFinishedAt: string;
  readonly data: T;
}
