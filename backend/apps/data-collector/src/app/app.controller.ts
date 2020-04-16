import { Body, Controller, Post } from '@nestjs/common';
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario';
import { DataCollectorService } from '../core/abstract/data-collector.service';

@Controller('api/v1/start')
export class AppController {

  constructor(private readonly dataCollectorService: DataCollectorService) {
  }

  @Post()
  start(@Body() req: CollectHotelsScenario): void {
    console.info('Starting scraping...');
    this.dataCollectorService.collectData(req);
  }
}
