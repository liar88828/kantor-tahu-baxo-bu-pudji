import type { TOrder } from '@/entity/client/orderan';
import { defaultDate, getTime } from '@/lib/utils/formatDate';

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
  guna  : "Untuk apa ??",
  lokasi: "Semarang",
  //travel
  namaPengiriman: "Kantor Tahu Baxo ",
  ongkir: 0,
  //transaksi
  id            : "",
  typePembayaran: "CASH",
  // total         : 0,
  totalBayar: 0,
  totalPenjualan: 0,
  status    : 'Di terima',

}