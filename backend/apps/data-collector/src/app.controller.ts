import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SearchRequestDocument } from './model/document/searchRequest.document';
import { ScrapingRunnerService } from './scrap/scraping-runner.service';

@Controller('api/v1/start')
export class AppController {

  constructor(private readonly scrapingRunnerService: ScrapingRunnerService) {
  }

  @Post()
  start(@Body() req: SearchRequestDocument): void {
    console.info('Starting scraping...');
    this.scrapingRunnerService.start(req);
  }
}
