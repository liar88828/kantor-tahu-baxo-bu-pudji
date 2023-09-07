import { TOrderServer } from '@/entity/server/orderan';
import { ToModel } from '@/app/utils/ress/GateWay';

export async function ErrorData( to: ToModel ) {
  if( to === "bank" )
    return {
      nama      : "kosong",
      jenis     : "kosong",
      lokasi    : "kosong",
      keterangan: "kosong",
      id        : "kosong",
      no        : "kosong",
      hp        : "kosong"
    } as TBank

  if( to === "orderan" )
    return {
      pengirim      : "kosong",
      hpPengirim    : "kosong",
      penerima      : "kosong",
      alamatPenerima: "kosong",
      hpPenerima    : "kosong",
      pesan         : "kosong",
      kirim         : "kosong",
      waktuKirim    : "kosong",
      semuaProduct  : [
        {
          orderanId : "kosong",
          id        : "kosong",
          nama      : "kosong",
          harga     : 0,
          lokasi    : "kosong",
          jenis     : "kosong",
          jumlah    : 0,
          keterangan: "kosong",
          img       : "kosong"
        },
      ],
      guna          : "kosong",
      lokasi        : "kosong",
      namaPengiriman: "kosong",
      ongkir        : 0,
      id            : "kosong",
      typePembayaran: "kosong",
      totalBayar    : 0,
      totalPenjualan: 0,
      status        : "kosong",

    } as TOrderServer

  if( to === "product" )
    return {
      id        : "kosong",
      harga     : 0,
      img       : "kosong",
      jenis     : "kosong",
      jumlah    : 0,
      keterangan: "kosong",
      lokasi    : "kosong",
      nama      : "kosong"
    } as TProduct

  if( to === "travel" )
    return {
      id            : "kosong",
      namaPengiriman: "kosong",
      noHpPerusahaan: "kosong",
      lokasi        : "kosong",
      jenis         : "kosong",
      harga         : 0,
      img           : "kosong",
      keterangan    : "kosong"
    } as TTravel

}