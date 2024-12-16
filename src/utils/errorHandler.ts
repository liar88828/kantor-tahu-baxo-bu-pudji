import { TResponse } from '@/interface/server/TResponse';

export class newError extends Error {
  constructor( m: TResponse<string> | string = "from new Error  " ) {
    super( "error Bos ku" );
    this.message = JSON.stringify( m )
  }
}

export class ErrorStore extends Error {
	constructor(public message: string) {
		super("error Bos ku");

		this.message = message;
	}
}
