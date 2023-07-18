import { TFormProduct } from './produk';

export type TOrder = {
// Product
  Product: TFormProduct[]
  // waktu
  tanggal: {
    pesan: Date | string
    kirim: Date | string
    waktuKirim: Date | string
  }

  // data orang
  orang: {
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
  }

//keterangan
  keterangan: {
    guna: string
    lokasi: string
  }

  travel: {
    namaPengiriman: string
    ekspedisi: string
    ongkir: number
  }

  total: {
    no: string
    pembayaran: string
    total: number
    totalBayar: number
    totalPenjualan?: number,
    status: 'Di terima' | 'Proses' | 'Kirim' | "Selesai"
  }
}

type TOnlyKey = Record<keyof TOrder, any>

export const formInput: TOnlyKey = {
  orang: {
    pengirim: "Pengirim",
    hpPengirim: "Hp Pengirim",
    penerima: "Penerima",
    alamatPenerima: "Alamat Penerima",
    hpPenerima: "Hp Penerima",
  },

  tanggal: {
    pesan: "Pesan",
    kirim: "Kirim",
    waktuKirim: "Waktu Kirim"
  },

  Product: [
    {
      id: "Se/Or/TBSp/42",
      nama: "Tahu Bakso Rebus",
      harga: 42_000,
      lokasi: "Ungaran",
      jenis: "Item"
    },
    {
      id: "Se/Or/TBSp/42",
      nama: "Tahu Bakso Special",
      harga: 50_000,
      lokasi: "Semarang",
      jenis: "Orderan",
    }

  ],
  keterangan: {
    guna: "Keterangan",
    lokasi: "Lokasi",
  },
  travel: {
    namaPengiriman: "Nama Travel",
    ekspedisi: "Ekspedisi",
    ongkir: "Ongkir",
  },
  total: {
    no: "No",
    pembayaran: "Pembayaran",
    total: "Total",
    totalBayar: "Total Bayar",
    totalPenjualan: "Total Penjualan",
    status: "Status"
  }
}
