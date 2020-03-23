import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Page } from 'puppeteer';

@Injectable()
export class FileManagerService {

  private readonly RESULTS_FOLDER_PATH = 'results/';

  public async saveHotelDataAsJSON(searchResult: any, formattedName: string): Promise<string> {
    const jsonPath = `${this.RESULTS_FOLDER_PATH}${this.getActualFormattedDate()}-${formattedName}.json`;
    if (!fs.existsSync(this.RESULTS_FOLDER_PATH)){
      fs.mkdirSync(this.RESULTS_FOLDER_PATH);
    }
    await new Promise<void>((resolve) => {
      fs.writeFile(jsonPath, JSON.stringify(searchResult), (err: NodeJS.ErrnoException): void => {
        if (err) {
          console.error(`Error when writing file '${jsonPath}'.`, err);
        }
        resolve();
      });
    });
    return jsonPath;
  }

  public async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ path: `${this.RESULTS_FOLDER_PATH}${this.getActualFormattedDate()}-${name}.png` });
  }

  private getActualFormattedDate = (): string => new Date().toISOString().replace(/[^0-9]/g, '');
}
