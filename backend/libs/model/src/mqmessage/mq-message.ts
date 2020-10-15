export interface MqMessage<T = never> {
  readonly searchId: string;
  readonly timestamp: number;
  readonly data?: T
}
