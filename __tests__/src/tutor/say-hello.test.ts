import { describe, expect, it } from 'vitest';
import { sayHello } from './say-hello';

// npx vitest --run --coverage __tests__/say-hello.test.ts

describe( "Say Hello ", () => {
  it( "should be say hello", () => {
    const result = sayHello( "Eko" )
    expect( result ).toBe( "Hello Eko" )
  } )
} )