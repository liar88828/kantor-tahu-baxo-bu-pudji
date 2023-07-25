import { TotalOrderan } from '@/entity/orderan';

export const format = ( dataBaru: TotalOrderan ): string => dataBaru.orang.penerima.toString().slice( 0, 2 ) + "/" +
  dataBaru.orang.hpPenerima.toString().slice( 0, 2 ) + "/" +
  dataBaru.orang.alamatPenerima.toString().slice( 0, 2 ) + "/" +
  dataBaru.tanggal.pesan.toString().slice( 0, 2 ) + "/" +
  dataBaru.tanggal.kirim.toString().slice( 0, 2 ) + "/" +
  dataBaru.tanggal.waktuKirim.toString().slice( 0, 2 ) + "/" +
  dataBaru.keterangan.lokasi.toString().slice( 0, 2 ) + "/"
// dataBaru.travel.namaPengiriman.toString().slice( 0, 2 ) + "/"

import { TOrder } from '@/entity/orderan';
import { getDateNow, getLocaleTime } from '@/lib/utils/formatDate';

export const defaultValues: TOrder = {
  //data orang
  orang: {
    pengirim: 'Kantor Tahu Baxo',
    hpPengirim: '',
    penerima: '',
    alamatPenerima: '',
    hpPenerima: '',
  },

  // waktu
  //toLocaleString === harus di isi parameternya
  tanggal: {
    pesan: getDateNow(),
    kirim: getDateNow(),
    waktuKirim: getLocaleTime()
  }
  ,
  // product
  listOrderan: [],
  listItem: [],
  semuaProduct: [],

  keterangan: {
    guna: "",
    lokasi: "",
  },
  travel: {
    namaPengiriman: "Kantor Tahu Baxo ",
    ekspedisi: '',
    ongkir: 0,
  },

  //transaksi
  total: {
    no: "",
    typePembayaran: "",
    total: 0,
    totalBayar: 0,
    totalPenjualan: 0,
    status: 'Di terima',
  }
}