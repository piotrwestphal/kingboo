export class TimeHelper {
  public static readonly HOUR_IN_SEC = 60 * 60
  public static readonly MINUTE_IN_MS = 60 * 1000
  public static readonly DAY_IN_MS = 24 * 60 * 60 * 1000
  public static getDiffTimeInSeconds = (refTimeMs: number): number => Math.round((Date.now() - refTimeMs) / 1000);
  public static getFormattedDate = (date: Date): string => date.toISOString().replace(/[^0-9]/g, '');
  public static getFormattedShortDate = (date: Date): string => `${date.getFullYear()}-` +
    `${TimeHelper.twoDigitFormat(date.getMonth() + 1)}-${TimeHelper.twoDigitFormat(date.getDate())}`;
  public static getFormattedDirectoryShortDate = (date: Date): string => `${date.getFullYear()}` +
    `${TimeHelper.twoDigitFormat(date.getMonth() + 1)}${TimeHelper.twoDigitFormat(date.getDate())}`;

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

  private static twoDigitFormat = (value: number) => `0${value}`.slice(-2)
}
