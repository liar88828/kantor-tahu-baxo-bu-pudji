import type { TOrder } from '@/entity/client/orderan';
import { defaultDate, getTime } from '@/lib/utils/formatDate';

export const defaultValues: TOrder = {
  //data orang
  pengirim  : 'Kantor Tahu Baxo',
  hpPengirim: '',
  penerima  : '',
  alamatPenerima: '',
  hpPenerima: '',
  // waktu
  pesan     : defaultDate(),
  kirim     : defaultDate(),
  waktuKirim: getTime(),
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
