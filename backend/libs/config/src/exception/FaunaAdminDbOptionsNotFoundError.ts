export class FaunaAdminDbOptionsNotFoundError extends Error {
  constructor(
    public readonly message = `Options for fauna admin db not found.`,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
