export interface Environments<T> {
  local: T;
  dev: (processEnv: NodeJS.ProcessEnv) => T;
  ci: (processEnv: NodeJS.ProcessEnv) => T;
  prod: (processEnv: NodeJS.ProcessEnv) => T;
}
