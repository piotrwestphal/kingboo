import { CreateCyclicSearch } from './create-cyclic-search';
import { CyclicSearch } from '../../core/model/CyclicSearch';
import { CyclicSearchRepository } from '../../core/abstract/cyclic-search.repository';
import { CyclicSearchFactory } from './cyclic-search.factory';
import { logger } from '../../logger';
import { CycleCalculator } from '../calculate-cycle/cycle.calculator';
import { ConflictException } from '@nestjs/common';

export class CyclicSearchService {

  constructor(
    private readonly cycleCalculator: CycleCalculator,
    private readonly cyclicSearchFactory: CyclicSearchFactory,
    private readonly cyclicSearchRepository: CyclicSearchRepository,
  ) {
  }

  async createCyclicSearch(createCyclicSearch: CreateCyclicSearch): Promise<CyclicSearch> {
    const cyclicSearch = this.cyclicSearchFactory.createNew(createCyclicSearch);
    const found = await this.cyclicSearchRepository.findByCyclicId(cyclicSearch.cyclicId);
    if (found) {
      throw new ConflictException(`Cyclic search with given search id [${cyclicSearch.cyclicId}] already exist.`);
    }
    const created = await this.cyclicSearchRepository.create(cyclicSearch);
    logger.info(`Cyclic search with id [${created.cyclicId}] was created`);
    logger.debug('Created cyclic search', created);
    this.cycleCalculator.calculate(created);
    return created;
  }

  async deleteCyclicSearch(cyclicId: string): Promise<void> {
    const deleted = await this.cyclicSearchRepository.delete(cyclicId);
    if (deleted) {
      logger.info(`Deleted cyclic search with id [${cyclicId}]`);
    }
  }
}
