import { describe, expect, test } from 'vitest';
import { newError } from '@/server/exeption/errorHandler';

describe( "exception error handler", () => {

  test( "should be rupiah", () => {
    expect( new newError( "error" ) ).to.toBeTypeOf( "object" )
  } )

} )
