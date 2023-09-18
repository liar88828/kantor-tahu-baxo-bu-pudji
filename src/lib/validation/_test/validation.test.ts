import { describe, expect, test } from 'vitest';
import Validation from '@/lib/validation/validation';
import Schema from '@/lib/validation/schema';
import { exampleBank } from '@/app/utils/ress/ErrorData';

const v    = new Validation()
const c    = new Schema()
const id   = "12345".repeat( 5 )
const bank = structuredClone( exampleBank )
bank.id    = id

describe( "test id zod", () => {
  test( "should be id zod success", () => {
    const test = v.validId( c.zodId( id ), id )
    expect( test ).toBe( id )
  } )

  test( "should be error rupiah", () => {
    const test = v.validModel( c.zodModel( bank, c.BankSchema ), bank )
    expect( test ).toBe( bank )

  } )
} )
