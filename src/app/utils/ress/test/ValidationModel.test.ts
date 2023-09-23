import { describe, expect, it } from 'vitest';
import { ValidationModel } from '@/app/utils/ress/ValidationModel';
import { exampleBank } from '@/app/utils/ress/ErrorData';

describe( 'test ValidationModel', () => {

  it( "should be success test ValidationModel ", () => {

    const data = ValidationModel( 'bank', exampleBank )
    expect( data ).toMatchObject( exampleBank )
  } )

  it( "should be error test ValidationModel by empty object ", () => {

    const data = ValidationModel( 'bank', {} )
    expect( data ).not.toMatchObject( exampleBank )
    expect( data ).toHaveLength( 7 )
  } )

  it( "should be error test ValidationModel wrong model", () => {
    // @ts-ignore
    const data = ValidationModel( '', {} )
    expect( data ).toBe( "required" )
  } )
} )
