import * as puppeteer from 'puppeteer';
import { Browser, ElementHandle, EvaluateFn, LaunchOptions, Page } from 'puppeteer';
import { PageElement } from './interface/page-element';
import { logger } from '../logger';

export class BrowserService {

  private readonly PUPPETEER_DEFAULT_ARGS = ['--incognito', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox'];
  private browser: Browser;
  private page: Page;

  async $(element: PageElement): Promise<ElementHandle | null> {
    return this.page.$(element.selector);
  }

  async getValueFromInput(selector: string): Promise<string> {
    return this.page.$eval(selector, (el: HTMLInputElement) => {
      return el.value;
    });
  }

  async initBrowserAndOpenBlankPage(launchOptions: LaunchOptions): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        ...launchOptions,
        args: this.PUPPETEER_DEFAULT_ARGS,
      });
      const pages = await this.browser.pages();
      this.page = pages[0];
      // TODO: below line could be removed if err not happen again
      this.page.on('error', (err) => {
        this.logAndRethrow('Something wrong happen during scraping. Check if there is no memory or CPU issue!! ', err);
      });
    } catch (e) {
      this.logAndRethrow(`Error when initializing browser and opening blank page.`, e);
    }
  }

  async enableRequestInterception(): Promise<void> {
    await this.page.setRequestInterception(true);
    this.page.on('request', (req) => {
      if (req.resourceType() === 'image' || req.resourceType() === 'font' || req.resourceType() === 'stylesheet') {
        req.abort();
      } else {
        req.continue();
      }
    });
  }

  async pagesCount(): Promise<Page[]> {
    if (this.browser) {
      return this.browser.pages();
    } else {
      return null;
    }
  }

  async closeBrowser(): Promise<void> {
    try {
      await this.browser.close();
      this.browser = null;
    } catch (e) {
      this.logAndRethrow(`Error when closing browser.`, e);
    }
  }

  async goToAddressAndProceedIfFail(url: string, timeout = 90000): Promise<void> {
    try {
      await this.page.goto(url, { timeout });
    } catch (e) {
      logger.error(`Waiting ${timeout / 1000}s for navigation after going to page [${url}]. ` +
        `Now stopping page loading. The browser might not display any content. Next steps could fail. ` +
        `Trying to proceed with process.`);
      await this.stopPageLoading();
    }
  }

  async setPageSize(size: { width: number, height: number }): Promise<void> {
    try {
      await this.page.setViewport(size);
    } catch (e) {
      this.logAndRethrow(`Error when setting page size to page.`, e);
    }
  }

  async takeScreenshot(pathToScreenshotsFolder: string): Promise<void> {
    try {
      await this.page.screenshot({ path: `${pathToScreenshotsFolder}/${new Date().toISOString().replace(/[^0-9]/g, '')}-error.png` });
    } catch (e) {
      this.logAndRethrow(`Error when taking screen shot, screen name: ${name}.`, e);
    }
  }

  async waitForVisible(element: PageElement, timeout = 20000, logBeforeRethrow = true): Promise<void> {
    try {
      await this.page.waitForSelector(element.selector, { visible: true, timeout });
    } catch (e) {
      if (logBeforeRethrow) {
        this.logAndRethrow(`Error when waiting for: '${element.description}' to be visible. Timeout: ${timeout}`, e);
      } else {
        throw e;
      }
    }
  }

  async waitForHidden(element: PageElement, timeout = 20000): Promise<void> {
    try {
      await this.page.waitForSelector(element.selector, { hidden: true, timeout });
    } catch (e) {
      this.logAndRethrow(`Error when waiting for: '${element.description}' to be not visible`, e);
    }
  }

  async wait(timeout: number): Promise<void> {
    try {
      await this.page.waitFor(timeout);
    } catch (e) {
      this.logAndRethrow(`Error when waiting ${timeout} ms`, e);
    }
  }

  async click(element: PageElement): Promise<void> {
    try {
      await this.page.click(element.selector);
    } catch (e) {
      this.logAndRethrow(`Error when clicking on: ${element.description}.`, e);
    }
  }

  async typeText(element: PageElement, text: string, delay = 50): Promise<void> {
    try {
      await this.page.type(element.selector, text, { delay });
    } catch (e) {
      this.logAndRethrow(`Error when typing text: "${text}" in: ${element.description}.`, e);
    }
  }

  async getText(element: PageElement): Promise<string | null> {
    try {
      return this.page.evaluate((selector: string) => {
        const htmlElement = document.querySelector(selector) as HTMLElement;
        return htmlElement ? htmlElement.innerText : null;
      }, element.selector);
    } catch (e) {
      this.logAndRethrow(`Error when getting text from: ${element.description}.`, e.message);
    }
  }

  // Code that evaluates on side of browser - use commonjs
  async evaluate<T>(fn: EvaluateFn, ...args: any[]): Promise<T> {
    return this.page.evaluate(fn, ...args);
  }

  private async stopPageLoading(): Promise<void> {
    const err = await this.page.evaluate(() => {
      try {
        window.stop();
      } catch (err) {
        return err;
      }
    });
    if (err) {
      this.logAndRethrow(`Error when trying to stop page loading.`, err);
    }
  }

  private logAndRethrow(errorMessage: string, e: Error): void {
    logger.error(errorMessage, e);
    throw e;
  }
}
