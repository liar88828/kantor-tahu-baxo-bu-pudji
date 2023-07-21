import { TFormProduct } from './produk';

export type TOrder = {
// Product
//   newValue: {
  listOrderan: TFormProduct[ ]
  listItem: TFormProduct[ ]
  semuaProduct: TFormProduct[ ]
  // }

  // oldValue: {
  //   listOrderan: TFormProduct[ ]
  //   listItem: TFormProduct[ ]
  //   semuaProduct: TFormProduct[ ]
  // }
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
    total?: number
    totalBayar?: number
    totalPenjualan?: number,
    status: 'Di terima' | 'Proses' | 'Kirim' | "Selesai"
  }
}

export  type Thitung = {
  semuaHargaOrderan: number,
  semuaHargaItem: number,
  semuaHargaProduct: number | false,
  totalHarga: number
}

export  type TotalOrderan = { hitung: Thitung } & { semuaProduct: TFormProduct[] } & TOrder

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
