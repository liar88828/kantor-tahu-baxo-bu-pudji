import { describe, expect, test } from 'vitest';
import Service from '@/lib/validation/validation';
import Validation from '@/lib/validation/schema';
import { exampleBank } from '@/app/utils/ress/ErrorData';

const c    = new Service()
const v    = new Validation()
const id   = "12345".repeat( 5 )
const bank = structuredClone( exampleBank )
bank.id    = id

describe( "test id zod", () => {
  test( "should be id zod success", () => {
    const test = c.validId( v.zodId( id ), id )
    expect( test ).toBe( id )
  } )

  test( "should be error rupiah", () => {
    const test = c.validModel( v.zodModel( bank, v.BankSchema ), bank )
    expect( test ).toBe( bank )

  } )
} )
