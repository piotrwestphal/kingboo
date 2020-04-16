import { MqMessage } from '@kb/model/mqmessage/mq-message';

export interface CollectHotelsScenarioMessage extends MqMessage {
  readonly resultsLimit: number;
  readonly searchPlace: string;
  readonly checkInDate: {
    readonly year: number;
    readonly month: number;
    readonly day: number;
  };
  readonly checkOutDate: {
    readonly year: number;
    readonly month: number;
    readonly day: number;
  };
  readonly numberOfRooms: number;
  readonly numberOfAdults: number;
  readonly childrenAgeAtCheckout: number[];
  readonly searchPlaceIdentifier: string;
}
