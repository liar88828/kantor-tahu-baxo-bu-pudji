import { describe, expect, it } from 'vitest';
import { GateWay } from '@/app/utils/ress/GateWay';

import { statusTest } from '@/app/api/_test/statusTest';

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

describe( "Test SemuaProduct", () => {
  // --------
  describe.sequential( "POST SemuaProduct", () => {
    it( "SemuaProduct Can create a post success ", async () => {
      const data = GateWay( "POST", "semuaProduk", "", json )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
    } )

    it( "SemuaProduct Cannot create a partial value ", async () => {
      const { harga, id, img, jenis, ...ress } = json
      const data                               = GateWay( "POST", "semuaProduk", "", ress )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )

    it( "SemuaProduct Cannot create a empty value ", async () => {
      const data = GateWay( "POST", "semuaProduk", "", {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )
  } )

  describe.sequential( "GET SemuaProduct", () => {
    it( "SemuaProduct Can find by all ", async () => {
      const data = GateWay( "GET", "semuaProduk", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "SemuaProduct Can find ID ", async () => {
      const data = GateWay( "GET", "semuaProduk", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "SemuaProduct Cannot find wrong ID ", async () => {
      const data = GateWay( "GET", "semuaProduk", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
    it( "SemuaProduct Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "semuaProduk", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
  } )

  describe.sequential( "PUT SemuaProduct", () => {
    it( "SemuaProduct Can edit by ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", json.id, json )
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
    } )

    it( "SemuaProduct Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", "salah", json )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )
    it( "SemuaProduct Cannot edit by empty ID ", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", "", json )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

    it( "SemuaProduct Cannot edit by partial value ", async () => {
      json.nama                                = "update"
      const { harga, id, img, jenis, ...ress } = json

      const data = GateWay( "PUT", "semuaProduk", json.id, ress )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

    it( "SemuaProduct Cannot edit by empty value", async () => {
      json.nama  = "update"
      const data = GateWay( "PUT", "semuaProduk", json.id, {} )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
    } )

  } )

  describe.sequential( "DELETE SemuaProduct", () => {
    it( "SemuaProduct Can delete by ID ", async () => {
      const data = GateWay( "DELETE", "semuaProduk", json.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
    } )

    it( "SemuaProduct Cannot delete by wrong ID ", async () => {
      const data = GateWay( "DELETE", "semuaProduk", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )

    it( "SemuaProduct Cannot delete by empty id ", async () => {
      const data = GateWay( "DELETE", "semuaProduk", "", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )
  } )

} )
