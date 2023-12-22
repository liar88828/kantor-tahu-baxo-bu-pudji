import { describe, expect, test } from 'vitest';
import { formatPhone } from '../../../src/lib/utils/formatPhone';

describe( "test Number Phone Indonesia", () => {

  test( "should be Phone Indonesia", () => {
    const test = formatPhone( "0987654321" )
    expect( test ).toBe( "+62 9876 5432 1" )
  } )

  test( "should be Phone Indonesia ready with 62", () => {
    const test = formatPhone( "+62987654321" )
    expect( test ).toBe( "+62 6298 7654 321" )

  } )

  test( "should be Phone Indonesia add +62", () => {
    const test = formatPhone( "1234567890" )
    expect( test ).toBe( "+62 1234 5678 90" )

  } )
  test( "should be error because number", () => {
    const test = formatPhone( 4123312312 )
    expect( test ).toBe( "+62 4123 3123 12" )
  } )

  test( "should be error because undefined", () => {
    const test = formatPhone( undefined )
    expect( test ).toBe( "-kosong-" )
  } )
} )
