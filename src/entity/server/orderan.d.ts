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

