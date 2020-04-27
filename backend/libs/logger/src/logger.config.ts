export interface LoggerConfig {
  readonly logLevel: string;
  readonly appLabel: string;
  readonly logOutputFolder: string;
  readonly logCollectorToken?: string;
}
