import { TopHotelsDocument } from './top-hotels.document'
import { TopHotelsDto } from '@kb/model'

export class TopHotelsDocumentMapper {
  fromDoc({
            bestPriceRate,
            cheapest,
            bestRate,
            bestLocation,
          }: TopHotelsDocument): TopHotelsDto {
    return {
      bestPriceRate,
      cheapest,
      bestRate,
      bestLocation,
    }
  }
}
