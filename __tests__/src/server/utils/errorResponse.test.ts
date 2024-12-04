import { describe, expect, it } from 'vitest';
import { errorDataZod, errorEmptyIDZod } from '@/lib/utils/errorResponse';
import { exampleDelivery } from "../../../../src/assets/ExampleDelivery";

describe( 'test id errorDataZod add', () => {
  it( 'should be Travel ID format errorDataZod', () => {
    const from = 'server'
		const test = errorDataZod(exampleDelivery, from)
    expect( test ).toMatchObject( {
			data: exampleDelivery,
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
