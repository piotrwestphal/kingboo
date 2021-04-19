import { Body, Controller, Delete, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateCyclicSearch } from './cyclic-search/create-cyclic-search';
import { CyclicSearchService } from './cyclic-search/cyclic-search.service';
import { CyclicSearch } from '../core/model/CyclicSearch';

@Controller('api/v1/cyclic-searches')
export class CyclicSearchController {

  constructor(
    private readonly cyclicSearchService: CyclicSearchService,
  ) {
  }

  @Post()
  async create(@Body() createCyclicSearch: CreateCyclicSearch): Promise<CyclicSearch> {
    return this.cyclicSearchService.createCyclicSearch(createCyclicSearch);
  }

  @Delete(':cyclic_id')
  async delete(@Param('cyclic_id') cyclicId: string): Promise<HttpStatus> {
    await this.cyclicSearchService.deleteCyclicSearch(cyclicId);
    return HttpStatus.OK;
  }
}
