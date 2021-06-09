import { BrowserService } from '../../browser.service';
import { ResultPageElement } from './result-page.element';
import { logger } from '../../../logger';

export class ResultPage {

  constructor(private readonly browserService: BrowserService) {
  }

  async handleSecurityCheck(): Promise<void> {
    try {
      await this.browserService.waitForVisible(ResultPageElement.SECURITY_CHECK_OVERLAY, 3000, false);
      await this.browserService.click(ResultPageElement.SECURITY_CHECK_CONFIRM_CHECKBOX);
      logger.error('There was security check');
    } catch (e) {
      logger.debug('No security check');
    }
  }

  async extractCurrentSearchPlaceNameFromHeader(): Promise<{ full: string, short: string } | null> {
    const textFromHeader = await this.browserService.getText(ResultPageElement.TITLE);
    if (textFromHeader) {
      const splitTextFromHeader = textFromHeader.split(':');
      return {
        full: textFromHeader.trim().replace(/\s/g, ' '),
        short: splitTextFromHeader[0],
      };
    }
    return {
      full: 'There was no text - check what went wrong',
      short: 'There was no text - check what went wrong',
    };
  }

  async clickNextPageButtonIfAvailable(): Promise<boolean> {
    const nextPageButton = await this.browserService.$(ResultPageElement.NEXT_PAGE_BUTTON);
    if (nextPageButton) {
      await this.browserService.click(ResultPageElement.NEXT_PAGE_BUTTON);
      logger.debug(`Proceeding to next page.`);
      return true;
    } else {
      return false;
    }
  }
}
