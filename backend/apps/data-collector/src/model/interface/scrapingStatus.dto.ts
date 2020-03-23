export interface ScrapingStatusDto {
    readonly searchId: string;
    readonly scrapingTimeSeconds: number;
    readonly currentPageNumber: number;
    readonly currentHotelsCount: number;
    readonly totalPagesCount: number;
    readonly scrapingCompleted: boolean;
    readonly savedToDb: boolean;
    readonly timestamp: number;
}
