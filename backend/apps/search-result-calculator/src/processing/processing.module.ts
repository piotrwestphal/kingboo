import { Module } from '@nestjs/common';
import { MessageProcessor } from './message.processor';
import { DistanceParser } from './parser/distance.parser';
import { RawHotelDtoParser } from './raw-hotel-dto.parser';
import { PriceParser } from './parser/price.parser';

@Module({
  providers: [
    {
      provide: MessageProcessor,
      useFactory: () => {
        const distanceParser = new DistanceParser();
        const priceParser = new PriceParser();
        const rawSearchResultParser = new RawHotelDtoParser();
        return new MessageProcessor(distanceParser, priceParser, rawSearchResultParser);
      },
    },
  ],
  exports: [
    MessageProcessor,
  ],
})
export class ProcessingModule {
}
