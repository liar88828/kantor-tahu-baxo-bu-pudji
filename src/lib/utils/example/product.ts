import { img } from '@/app/components/organisme/form/Bank';

export const formProduct: Record<keyof TProduct, any> = {
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
  nama      : "Tahu Baxo",
  harga     : 0,
  lokasi    : "Ungaran",
  jumlah    : 0,
  jenis     : "Item",
  img       : img,
  keterangan: ""
}

