import { TResponse } from '@/entity/client/ress/TResponse';

export class newError extends Error {
  constructor( m: TResponse<string> | string = "from new Error  " ) {
    super( "error Bos ku" );
    this.message = JSON.stringify( m )
  }
}
