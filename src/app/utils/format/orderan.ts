import type { TOrder, TotalOrderan } from '@/entity/client/orderan';
import { defaultDate, getDateNow, getLocaleTime, getTime } from '@/lib/utils/formatDate';

export const orderan = ( dataBaru: TotalOrderan ): string =>
  dataBaru.penerima.slice( 0, 5 ) + "/" +
  dataBaru.hpPenerima.toString().slice( 0, 4 ) + "/" +
  dataBaru.alamatPenerima.toString().slice( 0, 4 ) + "/" +
  dataBaru.pesan.toString().slice( 2, 4 ) +
  dataBaru.pesan.toString().slice( 5, 7 ) +
  dataBaru.pesan.toString().slice( 8, 10 ) +
  "/" +
  // dataBaru.kirim.toString().slice( 8, 10 ) + "/" +
  dataBaru.waktuKirim.toString().slice( 0, 2 ) +
  dataBaru.waktuKirim.toString().slice( 3, 5 ) +
  "/" +
  dataBaru.lokasi.toString().slice( 0, 3 ) + "/"

// dataBaru.travel.namaPengiriman.toString().slice( 0, 2 ) + "/"

export const defaultValues: TOrder = {
  //data orang
  pengirim  : 'Kantor Tahu Baxo',
  hpPengirim: '',
  penerima  : '',
  alamatPenerima: '',
  hpPenerima: '',
  // waktu
  //toLocaleString === harus di isi parameternya
  pesan     : defaultDate(),
  kirim     : defaultDate(),
  waktuKirim: getTime(),
  // product
  listOrderan: [],
  listItem   : [],
  semuaProduct: [],
  //keterangan
  guna  : "",
  lokasi: "",
  //travel
  namaPengiriman: "Kantor Tahu Baxo ",
  ongkir: 0,
  //transaksi
  id: "",
  no: "",
  typePembayaran: "",
  // total         : 0,
  totalBayar: 0,
  totalPenjualan: 0,
  status    : 'Di terima',

}