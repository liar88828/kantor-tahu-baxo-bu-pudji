import { describe, expect, it } from 'vitest';
import { ValidationModel } from '../../../src/lib/ress/ValidationModel';
import { exampleBank } from '../../../src/lib/ress/ErrorData';

describe( 'test ValidationModel', () => {

  it( "should be success test ValidationModel ", () => {

    const data = ValidationModel( 'bank', exampleBank, 'POST' )
    expect( data ).toMatchObject( exampleBank )
  } )

  it.skip( "should be error test ValidationModel by empty object ", () => {

    const data = ValidationModel( 'bank', {}, 'POST' )
    expect( data ).toMatchObject( [
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
    // expect( data ).toHaveLength( 7 )
  } )

  it( "should be error test ValidationModel wrong model", () => {
    // @ts-ignore
    const data = ValidationModel( '', {}, 'POST' )
    expect( data ).toMatchObject( {} )
  } )
} )
