import { TOrder, TotalOrderan } from '@/entity/client/orderan';
import { getDateNow, getLocaleTime } from '@/lib/utils/formatDate';

export const format = ( dataBaru: TotalOrderan ): string => dataBaru.penerima.toString()
                                                                    .slice( 0, 2 ) +
  "/" +
  dataBaru.hpPenerima.toString().slice( 0, 2 ) + "/" +
  dataBaru.alamatPenerima.toString().slice( 0, 2 ) + "/" +
  dataBaru.pesan.toString().slice( 0, 2 ) + "/" +
  dataBaru.kirim.toString().slice( 0, 2 ) + "/" +
  dataBaru.waktuKirim.toString().slice( 0, 2 ) + "/" +
  dataBaru.lokasi.toString().slice( 0, 2 ) + "/"
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
  pesan: getDateNow(),
  kirim: getDateNow(),
  waktuKirim: getLocaleTime(),

  // product
  listOrderan: [],
  listItem   : [],
  semuaProduct: [],

  //keterangan
  guna     : "",
  lokasi: "",

  //travel
  namaPengiriman: "Kantor Tahu Baxo ",
  ekspedisi: '',
  ongkir   : 0,

  //transaksi
  no        : "",
  typePembayaran: "",
  total     : 0,
  totalBayar: 0,
  totalPenjualan: 0,
  status    : 'Di terima',

}