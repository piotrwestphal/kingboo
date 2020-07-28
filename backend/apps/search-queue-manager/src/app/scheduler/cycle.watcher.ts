import { CycleCalculator } from '../calculate-cycle/cycle.calculator';
import { CyclicSearchRepository } from '../../core/abstract/cyclic-search.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { logger } from '../../logger';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CycleWatcher {
  constructor(
    private readonly cycleCalculator: CycleCalculator,
    private readonly cyclicSearchRepository: CyclicSearchRepository,
  ) {
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'calculate-next-cycles',
  })
  async calculateNextCycles() {
    logger.debug(`Triggering job [calculate-next-cycles]`);
    from(this.cyclicSearchRepository.findAll()).pipe(
      mergeMap(v => v),
    ).subscribe(async (cyclicSearch) => {
      await this.cycleCalculator.calculate(cyclicSearch);
    });
  }
}
