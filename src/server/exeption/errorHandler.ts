export class newError extends Error {
  constructor( message: string = "error Bos ku", m: string = "error" ) {
    super( message );
    this.name    = "Something Message"
    this.message = m

  }
}
