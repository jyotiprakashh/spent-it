export class ValidationError extends Error {
  public readonly field: string;

  constructor(message: string, field: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class OperationNotPermittedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OperationNotPermittedError';
  }
}
