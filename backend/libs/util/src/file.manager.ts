import * as fs from 'fs';
import { TimeHelper } from '@kb/util/time.helper';
import { CustomLoggerService } from '@kb/logger';

export class FileManager {

  private readonly RESULTS_FOLDER_PATH = 'output';

  constructor(
    private readonly logger: CustomLoggerService,
  ) {
  }

  get resultsFolderPath() {
    return this.RESULTS_FOLDER_PATH;
  }

  public async saveDataAsJSON(data: any, formattedName: string): Promise<string> {
    const now = new Date();
    const baseDir = `${this.RESULTS_FOLDER_PATH}/${TimeHelper.getFormattedDirectoryShortDate(now)}`;
    const jsonPath = `${baseDir}/${formattedName}-${TimeHelper.getFormattedDate(now)}.json`;
    try {
      await fs.promises.mkdir(baseDir, { recursive: true });
      await fs.promises.writeFile(jsonPath, JSON.stringify(data));
    } catch (err) {
      this.logger.error(`Error when saving data as json`, err);
    }
    return jsonPath;
  }
}
