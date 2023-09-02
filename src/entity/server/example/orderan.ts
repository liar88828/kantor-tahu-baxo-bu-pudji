import { TOrderServer } from '@/entity/server/orderan';

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
      orderanId : "asdasd",
      id        : "Se/Or/TBSp/42",
      nama      : "Tahu Bakso Rebus",
      harga     : 42_000,
      lokasi    : "Ungaran",
      jenis     : "Item",
      jumlah    : 10,
      keterangan: "Enak",
      img: "bagus"
    },
  ],
//keterangan
  guna  : "Keterangan",
  lokasi: "Lokasi",
//travel
  namaPengiriman: "Nama Travel",
  ongkir        : 23,
//total
  id            : "1231231",
  typePembayaran: "Pembayaran",
  // total         : 123,
  // keterangan    : "asdasd",

  totalBayar    : 123,
  totalPenjualan: 232,
  status        : "Status",

}
const exampleData: TOrderServer      =
        {
          "alamatPenerima": "Alamat Penerima",
          "guna"          : "Keterangan",
          "hpPenerima"    : "Hp Penerima",
          "hpPengirim"    : "Hp Pengirim",
          "id"            : "qwe",
          "kirim"         : "1999-07-01T00:00:00.000Z",
          "lokasi"        : "Lokasi",
          "namaPengiriman": "Nama Travel",
          "ongkir"        : 23,
          "penerima"      : "Penerima",
          "pengirim"      : "orang genah",
          "pesan"         : "1999-07-01T00:00:00.000Z",
          "semuaProduct"  : [
            {
              "harga"     : 42000,
              "id"        : "produk lagi1 123",
              "jumlah"    : 10,
              "jenis"     : "Itesm",
              "keterangan": "Esnak",
              "lokasi"    : "Ungsaran",
              "nama"      : "Tahu sBakso Rebus",
              "orderanId": "qwe",
              "img"      : "qwe"
            },
            {
              "harga"     : 42000,
              "id"        : "produk lagi 123",
              "jumlah"    : 10,
              "jenis"     : "Itesm",
              "keterangan": "Esnak",
              "lokasi"    : "Ungsaran",
              "nama"      : "Tahu sBakso Rebus",
              "orderanId": "qwe",
              "img"      : "qwe"

            }
          ],
          "status"        : "Status",
          "totalBayar"    : 123,
          "totalPenjualan": 232,
          "typePembayaran": "Pemsbayaran",
          "waktuKirim"    : "2023-07-20T00:00:00.000Z"
        }