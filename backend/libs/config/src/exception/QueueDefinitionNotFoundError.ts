export class QueueDefinitionNotFoundError extends Error {

  constructor(
    private readonly definition: string,
    public readonly message = `[${definition}] not found.`,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
