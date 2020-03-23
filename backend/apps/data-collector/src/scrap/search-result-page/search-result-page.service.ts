import { Injectable } from '@nestjs/common';
import { BrowserService } from '../browser.service';
import { SearchResultPage } from './SearchResultPage';

@Injectable()
export class SearchResultPageService {

    constructor(private readonly browserService: BrowserService) {
    }

    public async handleSecurityCheck(): Promise<void> {
        try {
            await this.browserService.waitForVisible(SearchResultPage.SECURITY_CHECK_OVERLAY, 3000, false);
            await this.browserService.click(SearchResultPage.SECURITY_CHECK_CONFIRM_CHECKBOX);
            console.error('THERE WAS SECURITY CHECK!!!');
        } catch (e) {
            console.debug('No security check');
        }
    }

    public async extractSearchPlaceNameFromHeader(): Promise<{ full: string, short: string } | null> {
        const textFromHeader = await this.browserService.getText(SearchResultPage.TITLE);
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

    public async clickNextPageButtonIfAvailable(): Promise<boolean> {
        const nextPageButton = await this.browserService.$(SearchResultPage.NEXT_PAGE_BUTTON);
        if (nextPageButton) {
            await this.browserService.click(SearchResultPage.NEXT_PAGE_BUTTON);
            console.debug(`${SearchResultPage.NEXT_PAGE_BUTTON.description} clicked.`);
            return true;
        } else {
            return false;
        }
    }
}
