import { MqMessage } from '@kb/model/mqmessage/mq-message';
import { RawHotelDto } from '@kb/model/raw-hotel/raw-hotel.dto';

export interface CollectedHotelsMessage extends MqMessage {
  readonly rawHotels: RawHotelDto[];
}
