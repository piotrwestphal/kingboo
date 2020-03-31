export class SecretForDbNameNotFoundError extends Error {
  constructor(
    private readonly dbName: string,
    public readonly message = `Secret for db name [${dbName}] not found.`,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
