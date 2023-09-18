import { describe, expect, test } from 'vitest';
import { GateWay } from '@/app/utils/ress/GateWay';
import { exampleProduct } from '@/app/utils/ress/ErrorData';

import { statusTest } from '@/app/api/_test/statusTest';

const json = structuredClone( exampleProduct )
json.id    = "kosong".repeat( 5 );

describe( "Test Product", () => {
  // --------
  describe.sequential( "POST Product", () => {
    test( "Product Can create a post success ", async () => {
      const data = GateWay( "POST", "product", "", json, "text" )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
    } )
    test( "Product cannot create partial value ", async () => {
      const { nama, jumlah, img, harga, ...ress } = json
      const data                                  = GateWay( "POST", "product", "", ress, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )

    test( "Product cannot create empty value ", async () => {
      const data = GateWay( "POST", "product", "", {}, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )
  } )

  describe.sequential( "GET Product", () => {
    test( "Product Can find by all ", async () => {
      // const data = getDashboard()
      const data = GateWay( "GET", "product", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    test( "Product Can find ID ", async () => {
      const data = GateWay( "GET", "product", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )
    test( "Product Cannot find wrong ID ", async () => {
      const data = GateWay( "GET", "product", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )

    test( "Product Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "product", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
  } )

  describe.sequential( "PUT Product", () => {

    test( "Product Can edit by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "product", json.id, json, "text" )
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
    } )

    test( "Product Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "product", "salah", json, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

    test( "Product Cannot edit by empty ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "product", "", json, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

    test( "Product Cannot edit by partial value", async () => {
      json.nama                                   = "update"
      const { nama, jumlah, img, harga, ...ress } = json
      const data                                  = GateWay( "PUT", "product", json.id, ress, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

    test( "Product Cannot edit by empty value ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "product", json.id, {}, "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )
  } )

  describe.sequential( "DELETE Product", () => {
    test( "Product Can delete by ID ", async () => {
      const data = GateWay( "DELETE", "product", json.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
    } )
    test( "Product Cannot delete by empty ID", async () => {
      const data = GateWay( "DELETE", "product", "", "text" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )
  } )

} )
