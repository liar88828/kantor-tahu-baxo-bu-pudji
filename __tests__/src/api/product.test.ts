import { describe, expect, test } from 'vitest';
import { exampleProduct } from '../../../src/app/utils/ress/ErrorData';
import { statusTest } from '../../../src/app/utils/test/statusTest';
import { successResponse } from '../../../src/lib/utils/successResponse';
import { errorData, errorEmptyData, errorEmptyID } from '../../../src/lib/utils/errorResponse';
import { useFetch } from "../../../src/hook/useFetch";

const json = structuredClone( exampleProduct )
json.id    = "kosong".repeat( 5 );

describe( "Test Product", () => {
  // --------
  describe( "POST Product", () => {
    test( "Product Can create a post success ", async () => {
      const data = useFetch("POST", "product", json,)
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.toMatchObject( successResponse( json, "POST" ) )
    } )

    test( "Product cannot create partial value ", async () => {
      const { nama, jumlah, img, ...ress } = json
      const data = useFetch("POST", "product", ress,)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toMatchObject( errorData( "POST", [
        {
          code    : 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path    : [ 'nama' ],
          message : 'Nama is required'
        },
        {
          code    : 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path    : [ 'img' ],
          message : 'Img is required'
        },
        {
          code    : 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path    : [ 'jumlah' ],
          message : 'Jumlah is required'
        }
      ] ) )
    } )

    test( "Product cannot create empty value ", async () => {
      const data = useFetch("POST", "product", {},)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "POST" ) )
    } )
  } )

  describe.sequential( "GET Product", () => {
    test( "Product Can find by all ", async () => {
      // const data = getDashboard()
      const data = useFetch("GET", "product", "",)
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toHaveProperty( "data[0].id", )
      await expect( data ).resolves.toHaveProperty( "data[0].harga", )
      await expect( data ).resolves.toHaveProperty( "data[0].img", )
      await expect( data ).resolves.toHaveProperty( "data[0].jenis", )
      await expect( data ).resolves.toHaveProperty( "data[0].jumlah", )
      await expect( data ).resolves.toHaveProperty( "data[0].keterangan", )
      await expect( data ).resolves.toHaveProperty( "data[0].lokasi", )
      await expect( data ).resolves.toHaveProperty( "data[0].nama", )
    } )

    test( "Product Can find ID ", async () => {
      const data = useFetch("GET", `product/${ json.id }`,)
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "GET" ) )
    } )

    test( "Product Cannot find wrong ID ", async () => {
      const data = useFetch("GET", "product", "salah",)
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
    } )

    test( "Product Cannot find empty ID ", async () => {
      const data = useFetch("GET", "product", "",)
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
    } )
  } )

  describe.sequential( "PUT Product", () => {

    test( "Product Can edit by ID ", async () => {
      json.nama  = "update"
      const data = useFetch("PUT", `product/${ json.id }`, json)
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toContain( statusTest( "PUT" ) )
    } )

    test( "Product Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      const data = useFetch("PUT", `product/${ "salah" }`, json,)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      // await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    test( "Product Cannot edit by empty ID ", async () => {
      json.nama  = "update"
      const data = useFetch("PUT", "product", json,)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    test( "Product Cannot edit by partial value", async () => {
      json.nama                                   = "update"
      const { nama, jumlah, img, ...ress }        = json
      const data = useFetch("PUT", `product/${ json.id }`, ress,)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorData( "PUT", [
        {
          code    : 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path    : [ 'nama' ],
          message : 'Nama is required'
        },
        {
          code    : 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path    : [ 'img' ],
          message : 'Img is required'
        },
        {
          code    : 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path    : [ 'jumlah' ],
          message : 'Jumlah is required'
        }
      ] ) )
    } )

    test( "Product Cannot edit by empty value ", async () => {
      json.nama  = "update"
      const data = useFetch("PUT", `product/${ json.id }`, {},)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "PUT" ) )
    } )
  } )

  describe.sequential( "DELETE Product", () => {
    test( "Product Can delete by ID ", async () => {
      const data = useFetch("DELETE", `product/${ json.id }`,)
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "DELETE" ) )
    } )

    test( "Cannot Product by wrong ID ", async () => {
      const data = useFetch("DELETE", "product", "salah",)
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
      // await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    test( "Product Cannot delete by empty ID", async () => {
      const data = useFetch("DELETE", `product/${ 0 }`,)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "DELETE" ) )
    } )
  } )

} )
