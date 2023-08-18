import React from 'react';

type Props =
  { tag?: keyof JSX.IntrinsicElements; }
  & React.HTMLAttributes<HTMLOrSVGElement>;

export type TOrder = {
  listOrderan: TProduct[ ]
  listItem: TProduct[ ]
  semuaProduct: TProduct[]
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
  guna: string
  lokasi: string
  namaPengiriman: string
  id: string
  typePembayaran: string

  ongkir: number
  totalBayar: number
  totalPenjualan: number,
  status: 'Di terima' | 'Proses' | 'Kirim' | "Selesai"
}

export  type Thitung = {
  semuaHargaOrderan: number,
  semuaHargaItem: number,
  semuaHargaProduct: number,
  totalHarga: number

}

export  type TotalOrderan =
  { hitung: Thitung } &
  { semuaProduct: TProduct[] } &
  TOrder

export type TOnlyKey = Record<keyof TOrder, any>

