export class TimeHelper {
  public static getDiffTimeInSeconds = (refTimeMs: number): number => Math.round((Date.now() - refTimeMs) / 1000);
  public static getFormattedDate = (date: Date): string => date.toISOString().replace(/[^0-9]/g, '');
  public static getFormattedShortDate = (date: Date): string => `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
}
