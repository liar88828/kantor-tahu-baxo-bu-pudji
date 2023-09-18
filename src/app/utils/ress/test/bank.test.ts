"use server"

import { describe, expect, test } from "vitest"
import { getId } from '@/app/utils/ress/setBank';
import { getDataById } from '@/app/utils/ress/bank';

describe( "test get api from bank", () => {

  test( "should be success", async () => {
    const testAPI = getId( "bank", "CA_09_Un_Kr_Bi_1693368262048" )
    await expect( testAPI ).resolves.toEqual( {
      "hp"        : "022342342",
      "id"        : "CA_09_Un_Kr_Bi_1693368262048",
      "jenis"     : "Kredit",
      "keterangan": "Bisa Di cicil",
      "lokasi"    : "Ungaran",
      "nama"      : "CASH",
      "no"        : "0234234343",
    } )
  } )

  test( "should be success", async () => {
    const testAPI = getDataById( "CA_09_Un_Kr_Bi_1693368262048" )
    await expect( testAPI ).resolves.toEqual( {
      "hp"        : "022342342",
      "id"        : "CA_09_Un_Kr_Bi_1693368262048",
      "jenis"     : "Kredit",
      "img"       : "https://logowik.com/content/uploads/images/cash2548.jpg",
      "keterangan": "Bisa Di cicil",
      "lokasi"    : "Ungaran",
      "nama"      : "CASH",
      "no"        : "0234234343",
    } )
  } )

} )
// import { sendData } from '@/app/utils/ress/SendApi';
// import { exampleBank } from '@/app/utils/ress/ErrorData';
//
// function setBank( d: TBank ) {
//   return {
//     nama      : d.nama,
//     jenis     : d.jenis,
//     lokasi    : d.lokasi,
//     keterangan: d.keterangan,
//     id        : d.id,
//     img: d.img,
//     no        : d.no,
//     hp        : d.hp
//   };
// }
//
// export async function getDataById( id: string ): Promise<TBank> {
//   const to                            = "bank"
//   const { data: d }: { data: TBank, } = await sendData( to, "GET", id );
//
//   return setBank( d )
// }
//
