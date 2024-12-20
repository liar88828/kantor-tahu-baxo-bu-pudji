import { defaultDate, getTime } from '@/lib/utils/formatDate';
import { TOrder } from '@/interface/orderan';

export const defaultValues: TOrder = {
  //data orang
  pengirim  : 'Kantor Tahu Baxo',
  hpPengirim: '',
  penerima  : '',
  dari      : '',
  alamatPenerima: '',
  hpPenerima: '',
  // waktu
  pesan: defaultDate(),
  // kirim     : defaultDate(),
  waktuKirim: defaultDate(),
  // product
  listOrderan: [],
  listItem   : [],
  semuaProduct: [],
  //keterangan
  // guna  : "Untuk apa ??",
  lokasi: "Semarang",
  //travel
  namaPengiriman: "",
  ongkir        : 0,
  //transaksi
  id            : "",
  typePembayaran: "CASH",
  totalBayar    : 0,
  totalPenjualan: 0,
  status        : 'Di terima',
  guna          : ""
}
