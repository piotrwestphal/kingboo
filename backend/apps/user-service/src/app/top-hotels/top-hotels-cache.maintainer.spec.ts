import { TopHotelsCacheMaintainer } from './top-hotels-cache.maintainer';
import { HotelsClient } from '../../core/abstract/hotels.client';
import { TopHotelsCacheRepository } from '../../core/abstract/top-hotels-cache.repository';
import { CacheData } from '../../core/model/CacheData';

class MockTopHotelsCacheRepository {
  find() {
    return;
  }

  delete() {
    return;
  }

  deleteMany() {
    return;
  }

  create() {
    return;
  }

  findAll() {
    return;
  }
}

class MockHotelsClient {
  getTopHotels() {
    return;
  }
}

describe('TopHotelsCacheMaintainer', () => {

  let topHotelsCacheMaintainer: TopHotelsCacheMaintainer
  let hotelsClient: HotelsClient
  let topHotelsCacheRepository: TopHotelsCacheRepository

  beforeEach(() => {
    hotelsClient = new MockHotelsClient() as any
    topHotelsCacheRepository = new MockTopHotelsCacheRepository() as any
    topHotelsCacheMaintainer = new TopHotelsCacheMaintainer(hotelsClient, topHotelsCacheRepository)
  })

  test('', async () => {
    // given
    const all = [
      CacheData.create({ searchId: 'a' } as any),
      CacheData.create({ searchId: 'b' } as any),
      CacheData.create({ searchId: 'c' } as any),
    ] as CacheData<any>[]

    jest.spyOn(topHotelsCacheRepository, 'findAll').mockResolvedValue(all);
    jest.spyOn(topHotelsCacheRepository, 'deleteMany').mockResolvedValue(0);

    // when
    await topHotelsCacheMaintainer.cleanup(['b'])

    // then
    expect(topHotelsCacheRepository.deleteMany).toHaveBeenCalledWith(['a', 'c'])
  })
})
