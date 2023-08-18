import { Thitung, TOrder, TotalOrderan } from '@/entity/client/orderan';

export const setIdTravel = ( dTravel: TTravel ): string =>
  dTravel.namaPengiriman.slice( 0, 2 ) + "_" +
  dTravel.harga.toString().slice( 0, 2 ) + "_" +
  dTravel.lokasi.slice( 0, 2 ) + "_" +
  dTravel.jenis.slice( 0, 2 ) + "_" +
  dTravel.keterangan.slice( 0, 2 ) + "_" + Date.now();

export const setIdProduct = ( dProduct: TProduct ): string =>
  dProduct.nama.slice( 0, 2 ) + "_" +
  dProduct.harga.toString().slice( 0, 2 ) + "_" +
  dProduct.lokasi.slice( 0, 2 ) + "_" +
  dProduct.jenis.slice( 0, 2 ) + "_" +
  dProduct.keterangan.slice( 0, 2 ) + "_" + Date.now();

function setIdOrderanString( dataBaru: { hitung: Thitung } & { semuaProduct: TProduct[] } & TOrder ) {
  return dataBaru.penerima.slice( 0, 5 ) + "_" +
    dataBaru.hpPenerima.toString().slice( 0, 4 ) + "_" +
    dataBaru.alamatPenerima.toString().slice( 0, 4 ) + "_" +

    dataBaru.pesan.toString().slice( 2, 4 ) +
    dataBaru.pesan.toString().slice( 5, 7 ) +
    dataBaru.pesan.toString().slice( 8, 10 ) +
    "_" +
    dataBaru.waktuKirim.toString().slice( 0, 2 ) +
    dataBaru.waktuKirim.toString().slice( 3, 5 ) +
    "_" +
    dataBaru.lokasi.toString().slice( 0, 3 ) + "_" +
    dataBaru.hpPenerima +
    dataBaru.hpPengirim +
    dataBaru.penerima.length;
}

export const setIdOrderan = ( dataBaru: TotalOrderan ): string =>
  setIdOrderanString( dataBaru ).replaceAll( " ", "_" )
