import { describe, expect, it } from 'vitest';
import { GateWay } from '../../../src/lib/utils/ress/GateWay';

import { statusTest } from '../utils/statusTest';
import { successResponse } from '../../../src/lib/exeption/successResponse';
import { errorEmptyData, errorEmptyID } from '../../../src/lib/exeption/errorResponse';

const exampleSemuaProduct = {
  id        : "Ta_50_Un_Or_Pe_1692805286012_169286063212",
  nama      : "kosong",
  lokasi    : "kosong",
  jenis     : "kosong",
  harga     : 0,
  jumlah    : 0,
  img       : "kosong",
  keterangan: "kosong",
  orderanId : "petri_biki_230909_Sem_22222"
}
const json                = structuredClone( exampleSemuaProduct )
json.id                   = "kosong".repeat( 5 );

describe.skip( "Test SemuaProduct", () => {
  // --------
  describe( "POST SemuaProduct", () => {
    it( "SemuaProduct Can create a post success ", async () => {
      const data = GateWay( "POST", "semuaProduk", "", json )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.toMatchObject( successResponse( json, "POST" ) )
    } )

    it( "SemuaProduct Cannot create a partial value ", async () => {
      const { harga, img, jenis, ...ress } = json
      const data                           = GateWay( "POST", "semuaProduk", "", ress )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toMatchObject( [
        {
          "code"   : "invalid_type",
          "expected": "number",
          "message": "Harga is required",
          "path"   : [
            "harga",
          ],
          "received": "undefined",
        },
        {
          "code"    : "invalid_type",
          "expected": "string",
          "message" : "Required",
          "path"    : [
            "img",
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
      ] )
    } )

    it( "SemuaProduct Cannot create a empty value ", async () => {
      const data = GateWay( "POST", "semuaProduk", "", {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "POST" ) )

    } )
  } )

  describe.sequential( "GET SemuaProduct", () => {
    it( "SemuaProduct Can find by all ", async () => {
      const data = GateWay( "GET", "semuaProduk", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toHaveProperty( "data[0].id", )
      await expect( data ).resolves.toHaveProperty( "data[0].nama", )
      await expect( data ).resolves.toHaveProperty( "data[0].lokasi", )
      await expect( data ).resolves.toHaveProperty( "data[0].jenis", )
      await expect( data ).resolves.toHaveProperty( "data[0].harga", )
      await expect( data ).resolves.toHaveProperty( "data[0].jumlah", )
      await expect( data ).resolves.toHaveProperty( "data[0].img", )
      await expect( data ).resolves.toHaveProperty( "data[0].keterangan", )
      await expect( data ).resolves.toHaveProperty( "data[0].orderanId", )
    } )

    it( "SemuaProduct Can find ID ", async () => {
      const data = GateWay( "GET", "semuaProduk", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "GET" ) )
    } )

    it( "SemuaProduct Cannot find wrong ID ", async () => {
      const data = GateWay( "GET", "semuaProduk", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )

    } )
    it( "SemuaProduct Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "semuaProduk", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
    } )
  } )

  describe( "PUT SemuaProduct", () => {
    it( "SemuaProduct Can edit by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", json.id, json )
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toHaveProperty( "data.lokasi", )
      await expect( data ).resolves.toHaveProperty( "data.jenis", )
      await expect( data ).resolves.toHaveProperty( "data.harga", )
      await expect( data ).resolves.toHaveProperty( "data.jumlah", )
      await expect( data ).resolves.toHaveProperty( "data.img", )
      await expect( data ).resolves.toHaveProperty( "data.keterangan", )
      await expect( data ).resolves.toHaveProperty( "data.orderanId", )
    } )

    it( "SemuaProduct Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", "salah", json )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    it( "SemuaProduct Cannot edit by empty ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", "", json )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    it( "SemuaProduct Cannot edit by partial value ", async () => {
      json.nama                            = "update"
      const { harga, img, jenis, ...ress } = json
      const data                           = GateWay( "PUT", "semuaProduk", json.id, ress )
      // await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( [
        {
          "code"   : "invalid_type",
          "expected": "number",
          "message": "Harga is required",
          "path"   : [
            "harga",
          ],
          "received": "undefined",
        },
        {
          "code"    : "invalid_type",
          "expected": "string",
          "message" : "Required",
          "path"    : [
            "img",
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
      ] )
    } )

    it( "SemuaProduct Cannot edit by empty value", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", json.id, {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect( data ).resolves.toMatchObject( errorEmptyData( "PUT" ) )
    } )

  } )

  describe( "DELETE SemuaProduct", () => {
    it( "SemuaProduct Can delete by ID ", async () => {
      const data = GateWay( "DELETE", "semuaProduk", json.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
      await expect( data ).resolves.toMatchObject( successResponse( json, "DELETE" ) )
    } )

    it( "SemuaProduct Cannot delete by wrong ID ", async () => {
      const data = GateWay( "DELETE", "semuaProduk", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )

    it( "SemuaProduct Cannot delete by empty id ", async () => {
      const data = GateWay( "DELETE", "semuaProduk", "", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
      await expect( data ).resolves.toMatchObject( errorEmptyID( "DELETE" ) )
    } )
  } )

} )
