import { describe, expect, it } from 'vitest';

describe( "sample slow test", () => {

  it.concurrent( "1. should pass 3000", async () => {
    await new Promise( resolve => setTimeout( resolve, 3000 ) )
    expect( 2 ).toBe( 2 )
  } )

  it.concurrent( "2. should pass 2000", async () => {
    await new Promise( resolve => setTimeout( resolve, 2000 ) )
    expect( 1 ).toBe( 1 )
  } )

  it.concurrent( "3. should pass 4000", async () => {
    await new Promise( resolve => setTimeout( resolve, 4000 ) )
    expect( 1 ).toBe( 1 )
  } )
} )