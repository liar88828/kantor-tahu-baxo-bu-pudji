export class newError extends Error {
  constructor(
    message: string = "error Bos ku",
    name            = "Something Message"
  ) {
    super( message, );
    this.message = message
    this.name    = name
  }
}
