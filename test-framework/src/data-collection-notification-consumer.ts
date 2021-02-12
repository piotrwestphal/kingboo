import {Controller} from "@nestjs/common";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {Subject} from "rxjs";

@Controller()
export class DataCollectionNotificationConsumer {

  private readonly searchPlaceQueue: Subject<any> = new Subject<any>();
  private readonly dataQueue: Subject<any> = new Subject<any>();

  @MessagePattern("SEARCH_PLACE_COLLECTION_COMPLETED")
  async getTemp1(@Payload() msg: any) {
    this.searchPlaceQueue.next(msg);
  }

  @MessagePattern("DATA_COLLECTION_FINISHED")
  async getTemp2(@Payload() msg: any) {
    this.dataQueue.next(msg);
  }

  getSearchPlaceQueue = () => this.searchPlaceQueue.asObservable()
  getDataQueue = () => this.dataQueue.asObservable()
}
