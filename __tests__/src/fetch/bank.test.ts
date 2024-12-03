import { describe, expect, it } from 'vitest';
import { statusTest } from '../utils/statusTest';

import { errorEmptyData, errorEmptyID } from '../../../src/lib/exeption/errorResponse';
import { successResponse } from '../../../src/lib/exeption/successResponse';
import { exampleBank } from "../../../src/app/utils/ress/ErrorData";
import { GateWay } from "../../../src/app/utils/ress/GateWay";

const json = structuredClone( exampleBank )
json.id = "kosong".repeat(4) + "test";

describe( "Test Bank api", () => {

  describe( "POST Bank", () => {
    it( "Bank Can create a post success ", async () => {
      const data = GateWay( "POST", "bank", "", json )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.toMatchObject( successResponse( json, "POST" ) )
    } )

    it( "Bank Cannot create partial value post error ", async () => {
      const { keterangan, lokasi, hp, id, ...ress } = json
      const data                                    = GateWay( "POST", "bank", "", ress )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect(data).resolves.toMatchObject([
        {
          code    : 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path    : [ 'hp' ],
          message : 'Hp is required'
        },
        {
          code    : "invalid_type",
          expected: "string",
          message : "Lokasi is required",
          path    : [ "lokasi", ],
          received: "undefined",
        },
        {
          code    : "invalid_type",
          expected: "string",
          message : "Keterangan is required",
          path    : [ "keterangan", ],
          received: "undefined",
        },
      ])
    } )

    it( "Bank Cannot create empty post error ", async () => {
      const data = GateWay( "POST", "bank", "", {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "POST" ) )
    } )
  } )

  describe( "GET Bank", () => {
    it( "Bank Can find by all ", async () => {
      const data = GateWay( "GET", "bank", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toHaveProperty( "data[0].jenis", )
      await expect( data ).resolves.toHaveProperty( "data[0].lokasi", )
      await expect( data ).resolves.toHaveProperty( "data[0].keterangan", )
      await expect( data ).resolves.toHaveProperty( "data[0].id", )
      await expect( data ).resolves.toHaveProperty( "data[0].no", )
      await expect( data ).resolves.toHaveProperty( "data[0].hp", )
      await expect( data ).resolves.toHaveProperty( "data[0].img", )
      await expect( data ).resolves.toHaveProperty( "data[0].nama", )
    } )

    it( "Bank Can find ID ", async () => {
      const data = GateWay( "GET", "bank", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "GET" ) )
    } )

    it( "Bank Cannot find ID ", async () => {
      const data = GateWay( "GET", "bank", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )

    } )
    it( "Bank Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "bank", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
    } )

    it( "Bank test ting  ", async () => {
      const data = GateWay( "GET", "bank", "test".repeat( 3 ), )
      await expect( data ).resolves.toMatchObject( {
        "code"   : 200,
        "data"   : null,
        "msg"    : "Success GET",
        "success": true,
      } )
    } )
  } )

  describe( "PUT Bank", () => {
    it( "Bank Can edit by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "bank", json.id, json )
      await expect( data ).resolves.toContain( statusTest( "PUT" ) )
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
    } )

    it( "Bank Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "bank", "salah", json )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )

    } )

    it( "Bank Cannot find empty ID ", async () => {
      const data = GateWay( "PUT", "bank", "", )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    it( "Bank Cannot edit partial value by ID ", async () => {
      json.nama                                 = "update"
      const { keterangan, lokasi, hp, ...ress } = json
      const data                                = GateWay( "PUT", "bank", json.id, ress )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect(data).resolves.toMatchObject([
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Hp is required",
          "path": [
            "hp",
          ],
          "received": "undefined",
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Lokasi is required",
          "path": [
            "lokasi",
          ],
          "received": "undefined",
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Keterangan is required",
          "path": [
            "keterangan",
          ],
          "received": "undefined",
        },
      ])
    } )

    it( "Bank Cannot edit empty value by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "bank", json.id, {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "PUT" ) )
    } )
  } )

  describe( "DELETE Bank", () => {
    it( "Bank Can delete by ID ", async () => {
      const data = GateWay( "DELETE", "bank", json.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "DELETE" ) )
    } )

    it( "Cannot delete by wrong ID ", async () => {
      const data = GateWay( "DELETE", "bank", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
      // await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )

    } )

    it( "Bank Cannot delete by empty ID ", async () => {
      const data = GateWay( "DELETE", "bank", "", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "DELETE" ) )

    } )
  } )

} )
