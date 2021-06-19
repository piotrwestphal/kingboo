import { logger } from '../logger'
import { BrowserService } from './browser.service'
import { ResultListPage } from './page/results-list/result-list.page'
import { ResultPage } from './page/result/result.page'

export class ResultListPreparer {

  private readonly BASE_URL: string = `https://www.booking.com`

  constructor(
    private readonly browserService: BrowserService,
    private readonly resultListPage: ResultListPage,
    private readonly resultPage: ResultPage,
  ) {
  }

  async prepareResultList(resultPageUri: string, enableStyles: boolean): Promise<number> {
    const resultPageUrl = `${this.BASE_URL}${resultPageUri}`
    logger.debug(`Navigating to [${resultPageUrl}]`)
    if (!enableStyles) {
      logger.debug('stylesheets/fonts/images on result list page are disabled')
      await this.browserService.enableStylesRequestInterception()
    }
    await this.browserService.goToAddressAndProceedIfFail(resultPageUrl)

    logger.debug('Trying to handle security check if appears.')
    await this.resultPage.handleSecurityCheck()

    logger.debug(`Extracting current search place name from header.`)
    const { full, short } = await this.resultPage.extractCurrentSearchPlaceNameFromHeader()
    logger.debug(`Full text extracted from header: [${full}].`)
    logger.info(`Performed search for place: [${short}]. Difference may occur due to wrong search request param, ` +
      `or place is not a city or not exist.`)

    const totalPagesCount = await this.resultListPage.getSearchResultListLastPageNumber()
    logger.debug(`There are [${totalPagesCount}] pages of search results.`)
    return totalPagesCount
  }
}
