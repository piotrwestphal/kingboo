export class TimeHelper {
  public static getDiffTimeInSeconds = (refTimeMs: number): number => Math.round((Date.now() - refTimeMs) / 1000);
  public static getFormattedDate = (date: Date): string => date.toISOString().replace(/[^0-9]/g, '');
  public static getFormattedShortDate = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  public static getFormattedDirectoryShortDate = (date: Date): string => `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
  public static addDays(date: Date, daysToAdd: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + daysToAdd);
    return result;
  }
  public static clearHours(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }
}
