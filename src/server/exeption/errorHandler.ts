export class newError extends Error {
  constructor( message: string = "error Bos ku", ) {
    super( message );
    this.name = "Something Message"
  }
}
