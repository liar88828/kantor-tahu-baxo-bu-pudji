import { describe, expect, it } from 'vitest';
import { exampleBank } from '@/app/utils/ress/ErrorData';
import { BankCreate } from "@/lib/validation/bank.valid";

describe( 'test ValidationModel', () => {

  it( "should be success test ValidationModel ", () => {
    
    const data = BankCreate.parse(exampleBank)
    expect( data ).toMatchObject( exampleBank )
  } )

  it( "should be error test ValidationModel by empty object ", () => {
    
    const data = BankCreate.parse(exampleBank)
    expect( data ).not.toMatchObject( exampleBank )
    expect( data ).toHaveLength( 7 )
  } )

  it( "should be error test ValidationModel wrong model", () => {
    // @ts-ignore
    const data = ValidationModel( '', {} )
    expect( data ).toBe( "required" )
  } )
} )
