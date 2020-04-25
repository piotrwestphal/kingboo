import * as fs from 'fs';
import { TimeHelper } from '@kb/util/time.helper';

export class FileManager {

  private readonly RESULTS_FOLDER_PATH = 'output';

  get resultsFolderPath() {
    return this.RESULTS_FOLDER_PATH;
  }

  public async saveDataAsJSON(data: any, formattedName: string): Promise<string> {
    const jsonPath = `${this.RESULTS_FOLDER_PATH}/${TimeHelper.getFormattedDate(new Date())}-${formattedName}.json`;
    if (!fs.existsSync(this.RESULTS_FOLDER_PATH)) {
      fs.mkdirSync(this.RESULTS_FOLDER_PATH);
    }
    await new Promise<void>((resolve) => {
      fs.writeFile(jsonPath, JSON.stringify(data), (err: NodeJS.ErrnoException): void => {
        if (err) {
          console.error(`Error when writing file '${jsonPath}'.`, err);
        }
        resolve();
      });
    });
    return jsonPath;
  }
}
