import React        from 'react';
import { TProduct } from '@/entity/client/produk';

export type Props =
  { tag?: keyof JSX.IntrinsicElements; }
  & React.HTMLAttributes<HTMLOrSVGElement>;

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

export  type TotalOrderan =
  { hitung: Thitung }
  & { semuaProduct: TProduct[] }
  & TOrder

export type TOnlyKey = Record<keyof TOrder, any>

