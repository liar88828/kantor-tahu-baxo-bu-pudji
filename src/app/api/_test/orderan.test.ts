import { describe, expect, it } from 'vitest';
import { GateWay } from '@/app/utils/ress/GateWay';

import { statusTest } from '@/app/api/_test/statusTest';
import { TPOrderan } from '@/server/models/prisma/config';
import { sendData } from '@/app/utils/ress/SendApi';

const default2: TPOrderan =
        {
          alamatPenerima: "kosong",
          guna          : "kosong",
          hpPenerima    : "kosong",
          hpPengirim    : "02398978978",
          id            : "parent_kosong_kosong_kosong_kosong_kosong",
          kirim         : "1999-07-01",
          lokasi        : "kosong",
          namaPengiriman: "kosong",
          ongkir        : 23,
          penerima      : "kosong",
          pengirim      : "kosong",
          pesan         : "2000-07-01",
          semuaProduct  : [
            // {
            //   harga     : 42000,
            //   id        : "321",
            //   jumlah    : 10,
            //   jenis     : "Itesm",
            //   keterangan: "Esnak",
            //   lokasi    : "ungaran",
            //   img       : "kosong",
            //   nama      : "Tahu sBakso Rebus",
            //   orderanId : "Lam5b_327_Ot_240229_1312_Sem_kosong"
            // },
            {
              nama      : "kosong",
              lokasi    : "kosong",
              jenis     : "kosong",
              harga     : 9999,
              jumlah    : 9999,
              keterangan: "kosong",
              orderanId : "parent_kosong_kosong_kosong_kosong_kosong",
              img       : "kosong"
            }
          ],
          status        : "kosong",
          totalBayar    : 9999,
          totalPenjualan: 9999,
          typePembayaran: "kosong",
          waktuKirim    : "03:00:00"
        }

const json = structuredClone( default2 )

describe( "Test Orderan", () => {
  // --------
  describe( "POST Orderan", () => {
    it( "Orderan Can create a post success ", async () => {
      const data = GateWay( "POST", "orderan", "", json, )
      await expect( data ).resolves.toContain( statusTest( "POST" ) )
    } )
    it( "Orderan cannot create partial value ", async () => {
      const { penerima, semuaProduct, ...ress } = json
      const data                                = GateWay( "POST", "orderan", "", ress, "" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )

    it( "Orderan cannot create empty value ", async () => {
      const data = GateWay( "POST", "orderan", "", {}, "" )
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
    } )
  } )

  describe( "GET Orderan", () => {
    it( "Orderan Can find by all ", async () => {
      // const data = getDashboard()
      const data = GateWay( "GET", "orderan", "all", )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "Orderan Can find ID ", async () => {
      const data = GateWay( "GET", "orderan", json.id, )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "Orderan Can find ID ", async () => {
      const data = GateWay( "GET", "orderan", "semua", "", "table" )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "Orderan Can find ID ", async () => {
      const data = GateWay( "GET", "orderan", "di dikirim", "", "table" )
      await expect( data ).resolves.toContain( statusTest( "GET" ) )
    } )

    it( "Orderan Cannot find wrong ID ", async () => {
      const data = GateWay( "GET", "orderan", "salah", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )

    it( "Orderan Cannot find empty ID ", async () => {
      const data = GateWay( "GET", "orderan", "", )
      await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
    } )
  } )

  describe( "PUT Orderan", () => {
    it( "Orderan Can edit by ID ", async () => {
      json.namaPengiriman = "update"
      const data          = GateWay( "PUT", "orderan", json.id, json, "" )
      await expect( data ).resolves.toHaveProperty( "data.0.count", 1 )
      await expect( data ).resolves.toHaveProperty( [ "data", 1, "count" ], 1 )
      // await expect( data ).resolves.toHaveProperty( ["data",1,"count"], "1" )
      await expect( data ).resolves.toHaveProperty( [ "data", 2, "namaPengiriman" ], "update" )
    } )
    it( "Orderan Cannot edit by wrong ID ", async () => {
      json.namaPengiriman = "update"
      const data          = GateWay( "PUT", "orderan", "salah", json, "" )
      await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
    } )
    it( "Orderan Cannot edit by empty ID ", async () => {
      json.namaPengiriman = "update"
      const data          = GateWay( "PUT", "orderan", "", json, "" )
      await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
    } )
    it( "Orderan Cannot edit by partial value", async () => {
      json.namaPengiriman               = "update"
      const { namaPengiriman, ...ress } = json
      const data                        = GateWay( "PUT", "orderan", json.id, ress, "" )
      await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
    } )
    it( "Orderan Cannot edit by empty value ", async () => {
      json.namaPengiriman = "update"
      const data          = GateWay( "PUT", "orderan", json.id, {}, "" )
      await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
    } )
  } )

  describe( "DELETE Orderan", () => {
    it.skip( "Orderan Can delete by id ", async () => {
      const data = GateWay( "DELETE", "orderan", default2.id, )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
    } )

    it( "Orderan Can delete by many id ", async () => {
      const data = sendData( "orderan", "DELETE", "", "", [ default2.id ], )
      await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
    } )

    it( "Orderan Cannot delete by wrong id ", async () => {
      const data = GateWay( "DELETE", "orderan", "", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )

    it( "Orderan Cannot delete by empty  id ", async () => {
      const data = GateWay( "DELETE", "orderan", "", )
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
    } )

  } )
} )
