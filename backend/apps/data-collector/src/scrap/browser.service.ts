import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Browser, ElementHandle, EvaluateFn, Page } from 'puppeteer';
import { PageElement } from './interface/pageElement';
import {
  PUPPETEER_DEVTOOLS_TURNED_ON,
  PUPPETEER_EXECUTABLE_PATH,
  PUPPETEER_HEADLESS_SCRAPING,
  PUPPETEER_SLOW_MO_MS,
} from '../config';
import { FileManagerService } from './file-manager.service';

@Injectable()
export class BrowserService {

  private browser: Browser;
  private page: Page;

  constructor(private readonly fileManagerService: FileManagerService) {
  }

  async $(element: PageElement): Promise<ElementHandle | null> {
    return this.page.$(element.selector);
  }

  async getValueFromInput(selector: string): Promise<string> {
    return this.page.$eval(selector, (el: HTMLInputElement) => {
      return el.value;
    });
  }

  async initBrowserAndOpenBlankPage(): Promise<void> {
    try {
      const args: string[] = ['--incognito', '--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox'];
      let options = {
        executablePath: PUPPETEER_EXECUTABLE_PATH,
        devtools: PUPPETEER_DEVTOOLS_TURNED_ON,
        headless: PUPPETEER_HEADLESS_SCRAPING,
        slowMo: PUPPETEER_SLOW_MO_MS,
        args,
      };
      if (PUPPETEER_EXECUTABLE_PATH) {
        options = {
          executablePath: PUPPETEER_EXECUTABLE_PATH,
          ...options,
        };
      }
      this.browser = await puppeteer.launch(options);
      const pages = await this.browser.pages();
      this.page = pages[0];
      // TODO: below lines could be removed if err not happen again
      await this.page.setRequestInterception(true);
      this.page.on('error', (err) => {
        this.logAndRethrow('Something wrong happen during scraping. Check if there is no memory or CPU issue!! ', err);
      });
      this.page.on('request', (req) => {
        if (req.resourceType() === 'image' || req.resourceType() === 'font' || req.resourceType() === 'stylesheet') {
          req.abort();
        } else {
          req.continue();
        }
      });
    } catch (e) {
      this.logAndRethrow(`Error when initialize browser and open black page.`, e);
    }
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

  async stopPageLoading(): Promise<void> {
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

  async goToAddress(url: string, timeout: number = 90000): Promise<void> {
    try {
      await this.page.goto(url, { timeout });
    } catch (e) {
      this.logAndRethrow(`Error when going to page: ${url}.`, e);
    }
  }

  async setPageSize(size: { width: number, height: number }): Promise<void> {
    try {
      await this.page.setViewport(size);
    } catch (e) {
      this.logAndRethrow(`Error when setting page size to page.`, e);
    }
  }

  async takeScreenshot(name: string): Promise<void> {
    try {
      await this.fileManagerService.takeScreenshot(this.page, name);
    } catch (e) {
      this.logAndRethrow(`Error when taking screen shot, screen name: ${name}.`, e);
    }
  }

  async waitForVisible(element: PageElement, timeout: number = 20000, logBeforeRethrow: boolean = true): Promise<void> {
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

  async waitForHidden(element: PageElement, timeout: number = 20000): Promise<void> {
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

  async typeText(element: PageElement, text: string, delay: number = 50): Promise<void> {
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

  private logAndRethrow(errorMessage: string, e: Error): void {
    console.error(errorMessage, e);
    throw e;
  }
}
