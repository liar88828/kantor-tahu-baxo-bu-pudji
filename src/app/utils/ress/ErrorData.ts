import { ToModel } from '@/entity/Utils';

export const exampleBank = {
  nama      : "kosong",
  jenis     : "kosong",
  lokasi    : "kosong",
  keterangan: "kosong",
  id        : "kosong",
  no        : "kosong",
  hp        : "kosong",
  img       : "kosong",
} as TBank

export const exampleOrderan = {
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

export const exampleTravel = {
  id        : "kosong",
  nama      : "kosong",
  hp        : "kosong",
  lokasi    : "kosong",
  jenis     : "kosong",
  harga     : 0,
  img       : "kosong",
  keterangan: "kosong"
} as TTravel

export const exampleProduct = {
  id        : "kosong",
  harga     : 0,
  img       : "kosong",
  jenis     : "kosong",
  jumlah    : 0,
  keterangan: "kosong",
  lokasi    : "kosong",
  nama      : "kosong"
} as TProduct

export async function ErrorData( to: ToModel ) {
  if( to === "bank" )
    return exampleBank

  if( to === "orderan" )
    return exampleOrderan

  if( to === "product" )
    return exampleProduct

  if( to === "travel" )
    return exampleTravel

}