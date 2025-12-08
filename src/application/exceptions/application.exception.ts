export abstract class ApplicationException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly title: string = 'Error de aplicación',
  ) {
    super(message);
  }
}
