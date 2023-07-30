import type { TOnlyKey } from '@/entity/client/orderan';

export const formInput: TOnlyKey = {
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
  listOrderan : [ {
    id    : "Se/Or/TBSp/42",
    nama  : "Tahu Bakso Special",
    harga : 50_000,
    lokasi: "Semarang",
    jenis : "Orderan",
  }
  ],
  listItem    : [ {
    id    : "Se/Or/TBSp/42",
    nama  : "Tahu Bakso Rebus",
    harga : 42_000,
    lokasi: "Ungaran",
    jenis : "Item"
  },
  ],
  semuaProduct: [ {
    id    : "Se/Or/TBSp/42",
    nama  : "Tahu Bakso Rebus",
    harga : 42_000,
    lokasi: "Ungaran",
    jenis : "Item"
  },
  ],
//keterangan
  guna  : "Keterangan",
  lokasi: "Lokasi",
//travel
  namaPengiriman: "Nama Travel",
  ekspedisi     : "Ekspedisi",
  ongkir        : "Ongkir",
//total
  id            : "1231231",
  no            : "No",
  typePembayaran: "Pembayaran",
  total         : "Total",
  totalBayar    : "Total Bayar",
  totalPenjualan: "Total Penjualan",
  status        : "Status"

}
