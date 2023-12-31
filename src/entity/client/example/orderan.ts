import type { TOnlyKey } from '@/entity/client/orderan';
import { TOrder } from '@/entity/client/orderan';

export const formInput: TOnlyKey = {

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
//keterangan
  guna  : "Keterangan",
  lokasi: "Lokasi",
//travel
  namaPengiriman: "Nama Travel",
  ongkir        : "Ongkir",
//total
  id            : "1231231",
  typePembayaran: "Pembayaran",
  // total         : "Total",
  totalBayar    : "Total Bayar",
  totalPenjualan: "Total Penjualan",
  status        : "Status"

}
const exampleKeyOnly: Partial<TOrder> = {
  lokasi: "asdas",
  ongkir: 1231
}