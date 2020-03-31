export interface FaunaAdminDbOptions {
  readonly domain: string | undefined;
  readonly scheme: 'http' | 'https' | undefined;
  readonly port: number | undefined;
  readonly secret: string;
}

export interface FaunaDbSecrets {
  readonly kingboo: string;
}
