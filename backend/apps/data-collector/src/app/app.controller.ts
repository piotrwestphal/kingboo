import { Body, Controller, Post } from '@nestjs/common';
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario';
import { DataCollectorService } from '../core/abstract/data-collector.service';
import { logger } from '../logger';

@Controller('api/v1/start')
export class AppController {

  constructor(private readonly dataCollectorService: DataCollectorService) {
  }

  @Post()
  start(@Body() req: CollectHotelsScenario): void {
    logger.info('Starting scraping...');
    this.dataCollectorService.collectData('test', 1, req, Date.now());
  }
}
