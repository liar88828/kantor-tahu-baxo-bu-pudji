import React from 'react';
import { TProduct } from '@/entity/produk';

export type Props = { tag?: keyof JSX.IntrinsicElements; } & React.HTMLAttributes<HTMLOrSVGElement>;

export type TOrder = {
  listOrderan: TProduct[ ]
  listItem: TProduct[ ]
  semuaProduct: TProduct[ ]
//waktu
  pesan: Date | string
  kirim: Date | string
  waktuKirim: Date | string
  // data orang
  pengirim: string
  hpPengirim: string
  penerima: string
  alamatPenerima: string
  hpPenerima: string
// keterangan
  guna: string
  lokasi: string
//Travel
  namaPengiriman: string
  ekspedisi: string
  ongkir: number
//total
  id?: string
  no: string
  typePembayaran: string
  total?: number
  totalBayar?: number
  totalPenjualan?: number,
  status: 'Di terima' | 'Proses' | 'Kirim' | "Selesai"
}

export  type Thitung = {
  semuaHargaOrderan: number,
  semuaHargaItem: number,
  semuaHargaProduct: number | false,
  totalHarga: number
}

export  type TotalOrderan = { hitung: Thitung } & { semuaProduct: TProduct[] } & TOrder

type TOnlyKey = Record<keyof TOrder, any>

export const formInput: TOnlyKey = {
//keterangan orang
  pengirim: "Pengirim",
  hpPengirim: "Hp Pengirim",
  penerima: "Penerima",
  alamatPenerima: "Alamat Penerima",
  hpPenerima: "Hp Penerima",
//tanggal pesan
  pesan: "Pesan",
  kirim: "Kirim",
  waktuKirim: "Waktu Kirim",
//orderan
  listOrderan: [ {
    id: "Se/Or/TBSp/42",
    nama: "Tahu Bakso Special",
    harga: 50_000,
    lokasi: "Semarang",
    jenis: "Orderan",
  }
  ],
  listItem: [ {
    id: "Se/Or/TBSp/42",
    nama: "Tahu Bakso Rebus",
    harga: 42_000,
    lokasi: "Ungaran",
    jenis: "Item"
  },
  ],
  semuaProduct: [ {
    id: "Se/Or/TBSp/42",
    nama: "Tahu Bakso Rebus",
    harga: 42_000,
    lokasi: "Ungaran",
    jenis: "Item"
  },
  ],
//keterangan
  guna: "Keterangan",
  lokasi: "Lokasi",
//travel
  namaPengiriman: "Nama Travel",
  ekspedisi: "Ekspedisi",
  ongkir: "Ongkir",
//total
  id: "1231231",
  no: "No",
  typePembayaran: "Pembayaran",
  total: "Total",
  totalBayar: "Total Bayar",
  totalPenjualan: "Total Penjualan",
  status: "Status"

}
