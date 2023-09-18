import { describe, expect, test } from 'vitest';
import { Rupiah } from '@/lib/utils/rupiah';
import { formatPhone } from '@/lib/utils/formatPhone';

describe( "test Number Phone Indonesia", () => {

  test( "should be Phone Indonesia", () => {
    const test = formatPhone( "0987654321" )
    // Rp 2.000,00
    expect( test ).toBe( "+62 9876 5432 1" )

  } )

  test( "should be Phone Indonesia add +62", () => {
    const test = formatPhone( "1234567890" )
    // Rp 2.000,00
    expect( test ).toBe( "+62 1234 5678 90" )

  } )

} )
