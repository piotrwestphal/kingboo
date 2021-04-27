import { ProcessingProgressRepository } from '../../core/abstract/processing-progress.repository'
import { DataUpdateSender } from '../../core/abstract/data-update.sender'
import { ProcessingProgressType } from '../../core/processing-actvity.type'
import { HotelsPart } from '../../core/model/HotelsPart'
import { HotelsSummary } from '../../core/model/HotelsSummary'
import { ProgressMeasuringService } from './progress-measuring.service'

class MockDataUpdateSender {
  notifyAboutHotelsProcessingFinished() {
    return
  }
}

class MockProcessingProgressRepository {
  create() {
    return
  }

  deleteMany() {
    return
  }

  findByType() {
    return
  }

  getQuantityOfType() {
    return
  }

}

describe('ProgressMeasuringService', () => {

  let progressMeasuringService: ProgressMeasuringService
  let dataUpdateSender: DataUpdateSender
  let processingProgressRepository: ProcessingProgressRepository

  beforeEach(() => {
    dataUpdateSender = new MockDataUpdateSender() as any
    processingProgressRepository = new MockProcessingProgressRepository() as any
    progressMeasuringService = new ProgressMeasuringService(dataUpdateSender, processingProgressRepository)
  })

  test('should summarize progress when "summary" message comes', async () => {
    // given
    const hotelsSummary: HotelsSummary = {
      searchId: 'mock',
      type: ProcessingProgressType.SUMMARY,
      data: {
        expectedNumberOfParts: 1,
        collectingStartedAt: '',
        collectingFinishedAt: ''
      }
    }
    jest.spyOn(processingProgressRepository, 'create')
      .mockResolvedValue(hotelsSummary)
    jest.spyOn(processingProgressRepository, 'getQuantityOfType')
      .mockResolvedValueOnce(1)
    jest.spyOn(processingProgressRepository, 'deleteMany')
      .mockResolvedValueOnce(2)
    jest.spyOn(dataUpdateSender, 'notifyAboutHotelsProcessingFinished')

    // when
    await progressMeasuringService.summarizeProgress('mock', hotelsSummary.data)

    // then
    expect(dataUpdateSender.notifyAboutHotelsProcessingFinished).toBeCalled()
  })

  test('should not summarize if "summary" message was not found', async () => {
    // given
    const hotelsPart = { searchId: 'mock', type: ProcessingProgressType.PART } as HotelsPart
    jest.spyOn(processingProgressRepository, 'create')
      .mockResolvedValue(hotelsPart)
    jest.spyOn(processingProgressRepository, 'findByType').mockResolvedValue(null)
    jest.spyOn(processingProgressRepository, 'getQuantityOfType')

    // when
    await progressMeasuringService.setProgress('mock')

    // then
    expect(processingProgressRepository.getQuantityOfType).not.toBeCalled()
  })

  test('should summarize if "part" message comes after "summary" message', async () => {
    // given
    const hotelsPart = { searchId: 'mock', type: ProcessingProgressType.PART } as HotelsPart
    const hotelsSummary: HotelsSummary = {
      searchId: 'mock',
      type: ProcessingProgressType.SUMMARY,
      data: {
        expectedNumberOfParts: 1,
        collectingStartedAt: '',
        collectingFinishedAt: ''
      }
    }
    jest.spyOn(processingProgressRepository, 'create').mockResolvedValue(hotelsPart)
    jest.spyOn(processingProgressRepository, 'findByType').mockResolvedValue(hotelsSummary)
    jest.spyOn(processingProgressRepository, 'getQuantityOfType').mockResolvedValue(1)
    jest.spyOn(dataUpdateSender, 'notifyAboutHotelsProcessingFinished')

    // when
    await progressMeasuringService.setProgress('mock')

    // then
    expect(dataUpdateSender.notifyAboutHotelsProcessingFinished).toBeCalled()
  })

  test('should not summarize if all parts are not found', async () => {
    // given
    const hotelsSummary: HotelsSummary = {
      searchId: 'mock',
      type: ProcessingProgressType.SUMMARY,
      data: {
        expectedNumberOfParts: 2,
        collectingStartedAt: '',
        collectingFinishedAt: ''
      }
    }
    jest.spyOn(processingProgressRepository, 'create')
      .mockResolvedValue(hotelsSummary)
    jest.spyOn(processingProgressRepository, 'getQuantityOfType')
      .mockResolvedValueOnce(1)
    jest.spyOn(processingProgressRepository, 'deleteMany')
    jest.spyOn(dataUpdateSender, 'notifyAboutHotelsProcessingFinished')

    // when
    await progressMeasuringService.summarizeProgress('mock', hotelsSummary.data)

    // then
    expect(processingProgressRepository.deleteMany).not.toBeCalled()
    expect(dataUpdateSender.notifyAboutHotelsProcessingFinished).not.toBeCalled()
  })

  test('should summarize if there are more parts than expected', async () => {
    // given
    const hotelsSummary: HotelsSummary = {
      searchId: 'mock',
      type: ProcessingProgressType.SUMMARY,
      data: {
        expectedNumberOfParts: 1,
        collectingStartedAt: '',
        collectingFinishedAt: ''
      }
    }
    jest.spyOn(processingProgressRepository, 'create')
      .mockResolvedValue(hotelsSummary)
    jest.spyOn(processingProgressRepository, 'getQuantityOfType')
      .mockResolvedValueOnce(2)
    jest.spyOn(processingProgressRepository, 'deleteMany')
      .mockResolvedValueOnce(2)
    jest.spyOn(dataUpdateSender, 'notifyAboutHotelsProcessingFinished')

    // when
    await progressMeasuringService.summarizeProgress('mock', hotelsSummary.data)

    // then
    expect(dataUpdateSender.notifyAboutHotelsProcessingFinished).toBeCalled()
  })
})
