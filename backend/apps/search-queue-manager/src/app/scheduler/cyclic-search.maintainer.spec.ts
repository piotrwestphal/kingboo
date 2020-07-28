import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { CyclicSearchMaintainer } from './cyclic-search.maintainer';
import { CyclicSearchRepository } from '../../core/abstract/cyclic-search.repository';
import { SearchRequest } from '../../core/model/SearchRequest';
import { CyclicSearch } from '../../core/model/CyclicSearch';
import { UserNotificationSender } from '../../core/abstract/user-notification.sender';

class MockCyclicSearchRepository {
  findByCyclicSearchRequest() {
    return;
  }
}

class MockSearchRequestRepository {
  findAllWithType() {
    return;
  }

  deleteMany() {
    return;
  }
}

class MockUserNotificationSender {
  notifyAboutDeletedCyclicSearchRequest() {
    return;
  }
}

describe('CyclicSearchMaintainer', () => {

  let cyclicSearchRepository: CyclicSearchRepository;
  let searchRequestRepository: SearchRequestRepository;
  let cyclicSearchMaintainer: CyclicSearchMaintainer;
  let userNotificationSender: UserNotificationSender;

  beforeEach(() => {
    cyclicSearchRepository = new MockCyclicSearchRepository() as any;
    searchRequestRepository = new MockSearchRequestRepository() as any;
    userNotificationSender = new MockUserNotificationSender() as any;
    cyclicSearchMaintainer = new CyclicSearchMaintainer(
      cyclicSearchRepository,
      searchRequestRepository,
      userNotificationSender,
    );
  });

  test('should not delete search requests if they are related to any cyclic search', async () => {
    // given
    const cyclicSearchRequests = [{ searchId: 'a' }, { searchId: 'b' }, { searchId: 'c' }] as SearchRequest[];
    jest.spyOn(searchRequestRepository, 'findAllWithType').mockResolvedValue(cyclicSearchRequests);
    jest.spyOn(cyclicSearchRepository, 'findByCyclicSearchRequest').mockResolvedValue({} as CyclicSearch);
    jest.spyOn(searchRequestRepository, 'deleteMany');
    jest.spyOn(userNotificationSender, 'notifyAboutDeletedCyclicSearchRequest');

    // when
    await cyclicSearchMaintainer.findUnrelatedCyclicSearchRequests();

    // then
    expect(searchRequestRepository.deleteMany).not.toBeCalled();
    expect(userNotificationSender.notifyAboutDeletedCyclicSearchRequest).not.toBeCalled();
  });

  test('should delete search requests that are not related to any cyclic search', async () => {
    // given
    const cyclicSearchRequests = [{ searchId: 'a' }, { searchId: 'b' }, { searchId: 'c' }] as SearchRequest[];
    jest.spyOn(searchRequestRepository, 'findAllWithType').mockResolvedValue(cyclicSearchRequests);
    jest.spyOn(cyclicSearchRepository, 'findByCyclicSearchRequest')
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({} as CyclicSearch)
      .mockResolvedValueOnce(null);
    jest.spyOn(searchRequestRepository, 'deleteMany');
    jest.spyOn(userNotificationSender, 'notifyAboutDeletedCyclicSearchRequest');

    // when
    await cyclicSearchMaintainer.findUnrelatedCyclicSearchRequests();

    // then
    expect(searchRequestRepository.deleteMany).toBeCalledWith(['a', 'c']);
    expect(userNotificationSender.notifyAboutDeletedCyclicSearchRequest).toBeCalledTimes(2);
  });
});
