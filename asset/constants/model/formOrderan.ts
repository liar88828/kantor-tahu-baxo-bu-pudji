import { TOrder } from '@/interface/orderan';

export const formOrderan: Record<keyof TOrder, any> = {
  id            : 'id',
  totalBayar    : 'totalBayar',
  totalPenjualan: 'totalPenjualan',
  status        : 'Status',
  guna          : 'Keterangan',
  listOrderan   : 'listOrderan',
  listItem      : 'listItem',
  //--- product
  semuaProduct: 'semuaProduct',
  //--- Pengirim
  pengirim      : 'Pengirim',
  hpPengirim    : 'Hp Pengirim',
  namaPengiriman: "Delivery",
  ongkir        : 'Harga Ongkir',
  lokasi        : "Lokasi",
  typePembayaran: 'Pembayaran',
  // ---penerima
  penerima      : 'Penerima',
  dari          : 'Dari',
  alamatPenerima: 'Alamat Penerima',
  hpPenerima    : 'Hp Penerima',
  // ---waktu
  pesan     : 'Pesan',
  waktuKirim: 'Waktu Kirim',
}