type TOrderanData = {
  id?: string
  // data orang
  pengirim: string
  hpPengirim: string
  penerima: string
  alamatPenerima: string
  hpPenerima: string
  //waktu
  pesan: Date | string
  kirim: Date | string
  waktuKirim: Date | string
  //keterangan
  guna: string
  lokasi: string
  // travel
  namaPengiriman: string
  ongkir: number
  //total
  typePembayaran: string
  totalBayar: number
  totalPenjualan: number,
  status: string
}
