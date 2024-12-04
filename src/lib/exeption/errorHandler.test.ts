import { describe, expect, test } from 'vitest';
import { newError } from './errorHandler';

describe( "exception error handler", () => {

  test( "should be response error", () => {
    expect( new newError( "error" ) ).to.toBeTypeOf( "object" )
  } )

} )
