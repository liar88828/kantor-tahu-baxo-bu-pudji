import { describe, expect, it } from 'vitest';
import { GateWay } from '@/app/utils/ress/GateWay';
import { exampleBank } from '@/app/utils/ress/ErrorData';
import { statusTest } from '@/app/api/_test/statusTest';

const json = structuredClone( exampleBank )
json.id    = "kosong".repeat( 4 ) + "par";

describe( "Test Bank api", () => {
  // --------
  describe( "POST Bank", () => {
    it( "Bank Can create a post success ", async () => {
      const data = GateWay( "POST", "bank", "", json )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
    } )

    it( "Bank Cannot create partial value post error ", async () => {
      const { keterangan, lokasi, hp, id, ...ress } = json
      const data                                    = GateWay( "POST", "bank", "", ress )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )

    it( "Bank Cannot create empty post error ", async () => {
      const data = GateWay( "POST", "bank", "", {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )
  } )

  describe( "GET Bank", () => {
    it( "Bank Can find by all ", async () => {
      const data = GateWay( "GET", "bank", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "Bank Can find ID ", async () => {
      const data = GateWay( "GET", "bank", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "Bank Cannot find ID ", async () => {
      const data = GateWay( "GET", "bank", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
    it( "Bank Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "bank", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
  } )

  describe( "PUT Bank", () => {
    it( "Bank Can edit by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "bank", json.id, json )
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
    } )

    it( "Bank Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "bank", "salah", json )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

    it( "Bank Cannot edit partial value by ID ", async () => {
      json.nama                                     = "update"
      const { keterangan, lokasi, hp, id, ...ress } = json
      const data                                    = GateWay( "PUT", "bank", json.id, ress )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

    it( "Bank Cannot edit empty value by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "bank", json.id, {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )
    it( "Bank Cannot find empty ID ", async () => {
      const data = GateWay( "PUT", "bank", "", )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
    } )

  } )

  describe( "DELETE Bank", () => {
    it( "Bank Can delete by ID ", async () => {
      const data = GateWay( "DELETE", "bank", json.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )

    } )

    it( "Cannot delete by wrong ID ", async () => {
      const data = GateWay( "DELETE", "bank", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )

    it( "Bank Cannot delete by empty ID ", async () => {
      const data = GateWay( "DELETE", "bank", "", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )
  } )

} )
