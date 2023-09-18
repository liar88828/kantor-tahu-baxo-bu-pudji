import { describe, expect, it } from 'vitest';
import { GateWay } from '@/app/utils/ress/GateWay';
import { exampleTravel } from '@/app/utils/ress/ErrorData';

import { statusTest } from '@/app/api/_test/statusTest';

const json = structuredClone( exampleTravel )
json.id    = "kosong".repeat( 5 );

describe( "Test Travel", () => {
  // --------
  describe( "POST Travel", () => {
    it( "Travel Can create a post success ", async () => {
      const data = GateWay( "POST", "travel", "", json, "text" )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
    } )

    it( "Travel Cannot create empty value ", async () => {
      const data = GateWay( "POST", "travel", "", {}, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )

    it( "Travel Cannot create partial value ", async () => {
      const { nama, hp, keterangan, id, harga, ...ress } = json
      const data                                         = GateWay( "POST", "travel", "", ress, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )

  } )

  describe( "GET Method ", () => {
    it( "Travel Can find by all ", async () => {
      const data = GateWay( "GET", "travel", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "Travel Can find ID ", async () => {
      const data = GateWay( "GET", "travel", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )
    it( "Travel Cannot find ID ", async () => {
      const data = GateWay( "GET", "travel", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
    it( "Travel Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "travel", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
  } )

  describe.sequential( "PUT Travel", () => {
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
    } )

    it( "Travel Cannot edit by empty ID", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "travel", "salah", json, "text" )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
    } )

    it( "Travel Cannot edit by Partial value ", async () => {
      json.nama                                          = "update"
      const { nama, hp, keterangan, id, harga, ...ress } = json
      const data                                         = GateWay( "PUT", "travel", json.id, ress, "text" )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
    } )

    it( "Travel Cannot edit by empty value ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "travel", json.id, {}, "text" )
      await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
    } )

  } )

  describe.sequential( "DELETE Travel", () => {
    it( "Travel Can delete by ID ", async () => {
      const data = GateWay( "DELETE", "travel", json.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
    } )
    it( "Travel Cannot delete by wrong ID ", async () => {
      const data = GateWay( "DELETE", "travel", "salah" )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )
    it( "Travel Cannot delete by empty ID ", async () => {
      const data = GateWay( "DELETE", "travel", "" )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )
  } )

} )
