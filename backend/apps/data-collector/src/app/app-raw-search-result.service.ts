import { RawSearchResultService } from '../core/abstract/raw-search-result.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRawSearchResultService extends RawSearchResultService {

  finishCollecting(searchId: string): void {
  }
}
