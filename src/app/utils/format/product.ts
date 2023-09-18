import { TKPerson } from '@/entity/client/person';
import { img } from '@/app/components/form/FormBank';

export const formProduct: TKPerson = {
  id    : "1231",
  nama  : "Nama Produk",
  harga : "Harga Produk",
  lokasi: "Lokasi Produk",
  jumlah: "Masukan Jumlah",
  jenis : "Jenis Produk",
  img   : "Gambar Produk",
  keterangan: "Keterangan Produk"
}

export const defaultFormProduct: TProduct = {
  id        : "",
  nama: "Tahu Baxo",
  harga     : 20000,
  lokasi    : "Ungaran",
  jumlah    : 0,
  jenis     : "Orderan",
  img : img,
  keterangan: "Pedas"
}

