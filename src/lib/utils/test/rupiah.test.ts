import { describe, expect, test } from 'vitest';
import { Rupiah } from '@/lib/utils/rupiah';

describe( "test Rupiah", () => {

  test( "should be rupiah", () => {
    const test = Rupiah( 2000 )
    // Rp 2.000,00
    expect( test ).toBe( "Rp 2.000,00" )

  } )
  test( "should be error rupiah", () => {
    const test = Rupiah( "asdas" )
    // Rp 2.000,00
    expect( test ).toBe( "kosong" )

  } )
} )
