import { ProductOrderan } from '@/app/components/organisme/form/FormOrderan';

export type ProductOrderan = Omit<TProduct, 'keterangan'>

export type TOrder = {
  listOrderan: TProduct[ ]
  listItem: TProduct[ ]
  semuaProduct: ProductOrderan[]
} & TOrderanData

export type TOnlyKey = Record<keyof TOrder, any>

type TOrderanData = {
  id?: string
  // data orang pengirim
  pengirim: string
  hpPengirim: string
  namaPengiriman: string
  ongkir: number
  // data orang pengirim
  penerima: string
  alamatPenerima: string
  hpPenerima: string
  dari: string
  guna: string
  lokasi: string
  //waktu
  pesan: Date | string
  waktuKirim: Date | string
  // kirim: Date | string
  //total
  typePembayaran: string
  totalBayar: number
  totalPenjualan: number,
  status: string
}

type TOrderServer = {
  semuaProduct: TProOrderan[ ]
//waktu
  pesan: Date | string
  // kirim: Date | string
  waktuKirim: Date | string

} & TOrderanData

