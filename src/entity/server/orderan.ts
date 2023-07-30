import { TPOrderan } from '@/entity/server/produkOrderan';

export type TOrderServer = {
  semuaProduct: TPOrderan[ ]
//waktu
  pesan: Date | string
  kirim: Date | string
  waktuKirim: Date | string
  // data orang
  pengirim: string
  hpPengirim: string
  penerima: string
  alamatPenerima: string
  keterangan: string
  hpPenerima: string
// keterangan
  guna: string
  lokasi: string
//Travel
  namaPengiriman: string
  ekspedisi: string
  ongkir: number
//total
  id: string
  no: string
  typePembayaran: string
  total: number
  totalBayar: number
  totalPenjualan: number,
  status: string
  semuaHargaOrderan: number,
  semuaHargaItem: number,
  semuaHargaProduct: number,
  totalHarga: number
}

export const formInput: TOrderServer = {
//keterangan orang
  pengirim      : "Pengirim",
  hpPengirim    : "Hp Pengirim",
  penerima      : "Penerima",
  alamatPenerima: "Alamat Penerima",
  hpPenerima    : "Hp Penerima",
//tanggal pesan
  pesan     : "Pesan",
  kirim     : "Kirim",
  waktuKirim: "Waktu Kirim",
//orderan
  semuaProduct: [
    {
      orderanId: "asdasd",
      id        : "Se/Or/TBSp/42",
      nama      : "Tahu Bakso Rebus",
      harga     : 42_000,
      lokasi    : "Ungaran",
      jenis     : "Item",
      jumlah    : 10,
      keterangan: "Enak",
      img       : "bagus"
    },
  ],
//keterangan
  guna  : "Keterangan",
  lokasi: "Lokasi",
//travel
  namaPengiriman: "Nama Travel",
  ekspedisi     : "Ekspedisi",
  ongkir        : 23,
//total
  id            : "1231231",
  no            : "No",
  typePembayaran: "Pembayaran",
  total         : 123,
  keterangan  : "asdasd",

  totalBayar    : 123,
  totalPenjualan: 232,
  status        : "Status",
  //total
  semuaHargaProduct: 12312,

  semuaHargaItem   : 12312,
  semuaHargaOrderan: 12312,
  totalHarga       : 1231

}
