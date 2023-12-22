import { describe, expect, test } from 'vitest';
import { validation } from '../../../../src/lib/validation/zod/validation';
import { exampleBank } from '../../../../src/lib/ress/ErrorData';

const v = validation
const id   = "12345".repeat( 5 )
const bank = structuredClone( exampleBank )
bank.id    = id

describe( "test id zod", () => {

  describe( "should be error zod ID", () => {

    test( "should be id zod success", () => {
      const test = v.validIdNew( id )
      expect( test ).toBe( id )
    } )

    test( "should be id zod error because empty", () => {
      const test = v.validIdNew( "" )
      expect( test ).toMatchObject( [
        {
          "code"     : "too_small",
          "exact"    : false,
          "inclusive": true,
          "message"  : "String must contain at least 5 character(s)",
          "minimum"  : 5,
          "path"     : [],
          "type"     : "string",
        },
      ] )
    } )
  } )

  describe( "test id zod", () => {
    test( "should be error zod Object", () => {
      const test = v.validModelNew( bank, v.BankSchema )
      expect( test ).toBe( bank )
    } )

    test.skip( "should be error because empty schema data", () => {
      // @ts-ignore
      const test = v.validModelNew( {}, v.BankSchema )
      // expect( test ).toHaveLength( 7 )
      expect( test ).toMatchObject(
        [
          {
            "code"    : "invalid_type",
            "expected": "string",
            "message" : "Hp is required",
            "path"    : [
              "hp",
            ],
            "received": "undefined",
          },
          {
            "code"    : "invalid_type",
            "expected": "string",
            "message" : "Hp is required",
            "path"    : [
              "img",
            ],
            "received": "undefined",
          },
          {
            "code"    : "invalid_type",
            "expected": "string",
            "message" : "No is required",
            "path"    : [
              "no",
            ],
            "received": "undefined",
          },
          {
            "code"    : "invalid_type",
            "expected": "string",
            "message" : "nama is required",
            "path"    : [
              "nama",
            ],
            "received": "undefined",
          },
          {
            "code"    : "invalid_type",
            "expected": "string",
            "message" : "Lokasi is required",
            "path"    : [
              "lokasi",
            ],
            "received": "undefined",
          },
          {
            "code"    : "invalid_type",
            "expected": "string",
            "message" : "Jenis is required",
            "path"    : [
              "jenis",
            ],
            "received": "undefined",
          },
          {
            "code"    : "invalid_type",
            "expected": "string",
            "message" : "Keterangan is required",
            "path"    : [
              "keterangan",
            ],
            "received": "undefined",
          },
        ] )
    } )

    test.skip( "should be error because wrong schema", () => {
      // @ts-ignore
      const test = v.validModelNew( bank, v.semuaProdukSchema )
      // expect( test ).toHaveLength( 3 )
      expect( test ).toMatchObject( [
        {
          "code"    : "invalid_type",
          "expected": "number",
          "message" : "Harga is required",
          "path"    : [
            "harga",
          ],
          "received": "undefined",
        },
        {
          "code"    : "invalid_type",
          "expected": "number",
          "message" : "Jumlah is required",
          "path"    : [
            "jumlah",
          ],
          "received": "undefined",
        },
        {
          "code"    : "invalid_type",
          "expected": "string",
          "message" : "Required",
          "path"    : [
            "orderanId",
          ],
          "received": "undefined",
        },
      ] )
    } )
  } )
} )
