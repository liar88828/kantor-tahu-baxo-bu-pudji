import { describe, expect, it } from 'vitest';
import { setIdBank, setIdModel, setIdOrderan, setIdProduct, setIdTravel } from '../../../src/lib/utils/formatId';
import { exampleBank, exampleOrderan, exampleProduct, exampleTravel } from '../../../src/lib/ress/ErrorData';

describe( 'test id', () => {
  it( 'should be Travel ID format ', () => {
    const test = setIdTravel( exampleTravel )
    expect( test ).toContain( "ko_0_ko_ko_ko_" )
  } );

  it( 'should be Bank ID format', () => {
    const test = setIdBank( exampleBank )
    expect( test ).toContain( "ko_ko_ko_ko_ko_" )
  } );
  it( 'should be Product ID format', () => {
    const test = setIdProduct( exampleProduct )
    expect( test ).toContain( "ko_0_ko_ko_ko_" )
  } );
  it( 'should be Orderan ID format', () => {
    const test = setIdOrderan( exampleOrderan )
    expect( test ).toContain( "koson_koso_sog_kos_koson" )
  } );

  describe( "branch", () => {

    it( 'should be exampleBank ID format', () => {
      const test = setIdModel( 'bank', exampleBank )
      expect( test ).toContain( "ko_ko_ko_ko_ko_" )
    } );
    it( 'should be exampleTravel ID format', () => {
      const test = setIdModel( 'travel', exampleTravel )
      expect( test ).toContain( "ko_0_ko_ko_ko_" )
    } );

    it( 'should be exampleOrderan ID format', () => {
      const test = setIdModel( 'orderan', exampleOrderan )
      expect( test ).toContain( "koson_koso_sog_kos_koson" )
    } );

    it( 'should be exampleProduct ID format', () => {
      const test = setIdModel( 'product', exampleProduct )
      expect( test ).toContain( "ko_0_ko_ko_ko_" )

    } );
    it( 'should be exampleSemuaProduk ID format', () => {
      const test = setIdModel( 'semuaProduk', exampleProduct )
      expect( test ).toContain( "ko_0_ko_ko_ko_" )
    } );

  } )
} )
