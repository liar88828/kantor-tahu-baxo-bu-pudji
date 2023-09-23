import { describe, expect, it } from 'vitest';
import { exampleTravel } from '@/app/utils/ress/ErrorData';
import { errorDataZod, errorEmptyIDZod } from '@/lib/utils/errorResponse';

describe( 'test id errorDataZod add', () => {
  it( 'should be Travel ID format errorDataZod', () => {
    const from = 'server'
    const test = errorDataZod( exampleTravel, from )
    expect( test ).toMatchObject( {
      data   : exampleTravel,
      msg    : `${ from } Data not Valid`,
      success: false,
    } )
  } );

  it( 'should be Travel ID format errorDataZod string', () => {
    const id   = "test";
    const test = errorEmptyIDZod( id )
    expect( test ).toMatchObject( {
      data   : id,
      msg    : `Id Is not valid`,
      success: false,
    } )
  } );

  it( 'should be Travel ID format errorDataZod array of string', () => {
    const id   = [ "test1", "test2" ];
    const test = errorEmptyIDZod( id )
    expect( test ).toMatchObject( {
      data   : id,
      msg    : `Id Is not valid`,
      success: false,
    } )
  } );
} );
