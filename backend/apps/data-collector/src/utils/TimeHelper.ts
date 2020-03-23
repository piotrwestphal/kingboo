export class TimeHelper {
    public static getDiffTimeInSeconds = (refTimeMs: number): number => Math.round((Date.now() - refTimeMs) / 1000);
}
