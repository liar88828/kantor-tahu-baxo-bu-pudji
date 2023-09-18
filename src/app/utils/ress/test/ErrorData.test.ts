import { ErrorData, exampleBank, exampleOrderan, exampleProduct, exampleTravel } from '@/app/utils/ress/ErrorData';
import { describe, expect, it } from 'vitest';

describe( 'test Error Format', () => {

  it( 'should be objected bank example', async () => {
    const test = ErrorData( "bank" )
    await expect( test ).resolves.toEqual( exampleBank )
  } );

  it( 'should be objected travel example', async () => {
    const test = ErrorData( "travel" )
    await expect( test ).resolves.toEqual( exampleTravel )
  } );

  it( 'should be objected orderan example', async () => {
    const test = ErrorData( "orderan" )
    await expect( test ).resolves.toEqual( exampleOrderan )
  } );

  it( 'should be objected product example', async () => {
    const test = ErrorData( "product" )
    await expect( test ).resolves.toEqual( exampleProduct )
  } );

} )