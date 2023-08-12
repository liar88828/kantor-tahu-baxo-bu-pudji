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
  // keterangan: string
  hpPenerima: string

// keterangan
  guna: string
  lokasi: string

//Travel
  namaPengiriman: string
  ongkir: number
//id
  id?: string
  no: string

//total
  typePembayaran: string
  totalBayar: number
  totalPenjualan: number,
  status: string
//hitung
  semuaHargaOrderan: number,
  semuaHargaItem: number,
  semuaHargaProduct: number,
  totalHarga: number

}

