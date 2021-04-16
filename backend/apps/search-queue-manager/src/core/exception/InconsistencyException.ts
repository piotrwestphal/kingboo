export class InconsistencyException extends Error {
  constructor(
    public readonly message,
  ) {
    super(message)
    this.name = this.constructor.name;
  }
}
