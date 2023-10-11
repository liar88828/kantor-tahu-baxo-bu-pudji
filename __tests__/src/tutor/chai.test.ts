import { assert, describe, expect, it } from 'vitest';

const sayHello = ( name: string ): string => {
  return `Hello ${ name }`
}

describe( "say hello ", () => {
  it( "should return white name ", () => {
    expect( sayHello( "Eko" ) ).to.be.a( "string", "Hello Eko" )
    assert.equal( sayHello( "Eko" ), "Hello Eko" )
  } )
} )