import { describe, expect, it } from 'vitest';
import { GateWay } from '@/app/utils/ress/GateWay';
import { exampleTravel } from '@/app/utils/ress/ErrorData';

import { statusTest } from '@/app/utils/test/statusTest';
import { successResponse } from '@/lib/utils/successResponse';
import { errorData, errorEmptyData, errorEmptyID } from '@/lib/utils/errorResponse';

const json = structuredClone( exampleTravel )
json.id    = "kosong".repeat( 5 );

describe( "Test Travel", () => {
  // --------
  describe( "POST Travel", () => {
    it( "Travel Can create a post success ", async () => {
      const data = GateWay( "POST", "travel", "", json, "text" )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.toMatchObject( successResponse( json, "POST" ) )
    } )

    it( "Travel Cannot create partial value ", async () => {
      const { nama, hp, keterangan, harga, ...ress } = json
      const data                                     = GateWay( "POST", "travel", "", ress, "text" )
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
          path    : [ 'hp' ],
          message : 'Hp is required'
        },
        {
          code    : 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path    : [ 'keterangan' ],
          message : 'Keterangan is required'
        },
        {
          code    : 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path    : [ 'harga' ],
          message : 'Harga is required'
        }
      ] ) )
    } )

    it( "Travel Cannot create empty value ", async () => {
      const data = GateWay( "POST", "travel", "", {}, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "POST" ) )
    } )
  } )

  describe( "GET Method ", () => {
    it( "Travel Can find by all ", async () => {
      const data = GateWay( "GET", "travel", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toHaveProperty( "data[0].id", )
      await expect( data ).resolves.toHaveProperty( "data[0].nama", )
      await expect( data ).resolves.toHaveProperty( "data[0].hp", )
      await expect( data ).resolves.toHaveProperty( "data[0].lokasi", )
      await expect( data ).resolves.toHaveProperty( "data[0].jenis", )
      await expect( data ).resolves.toHaveProperty( "data[0].harga", )
      await expect( data ).resolves.toHaveProperty( "data[0].img", )
      await expect( data ).resolves.toHaveProperty( "data[0].keterangan", )
    } )

    it( "Travel Can find ID ", async () => {
      const data = GateWay( "GET", "travel", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "GET" ) )
    } )

    it( "Travel Cannot find ID ", async () => {
      const data = GateWay( "GET", "travel", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
    } )

    it( "Travel Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "travel", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
    } )
  } )

  describe( "PUT Travel", () => {
    it( "Travel Can edit by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "travel", json.id, json, "text" )
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toContain( statusTest( "PUT" ) )
    } )

    it( "Travel Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "travel", "salah", json, "text" )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    it( "Travel Cannot edit by Partial value ", async () => {
      json.nama                                      = "update"
      const { nama, hp, keterangan, harga, ...ress } = json
      const data                                     = GateWay( "PUT", "travel", json.id, ress, "text" )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
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
          path    : [ 'hp' ],
          message : 'Hp is required'
        },
        {
          code    : 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path    : [ 'keterangan' ],
          message : 'Keterangan is required'
        },
        {
          code    : 'invalid_type',
          expected: 'number',
          received: 'undefined',
          path    : [ 'harga' ],
          message : 'Harga is required'
        }
      ] ) )
    } )

    it( "Travel Cannot edit by empty ID", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "travel", "salah", json, "text" )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )

    } )

    it( "Travel Cannot edit by empty value ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "travel", json.id, {}, "text" )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "PUT" ) )
    } )

  } )

  describe.sequential( "DELETE Travel", () => {
    it( "Travel Can delete by ID ", async () => {
      const data = GateWay( "DELETE", "travel", json.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "DELETE" ) )
    } )
    it( "Travel Cannot delete by wrong ID ", async () => {
      const data = GateWay( "DELETE", "travel", "salah" )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )
    it( "Travel Cannot delete by empty ID ", async () => {
      const data = GateWay( "DELETE", "travel", "" )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "DELETE" ) )
    } )
  } )

} )
