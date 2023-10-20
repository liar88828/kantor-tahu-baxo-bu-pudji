import { jpgTextNotFound } from '../data/images';

export const formProduct: Record<keyof TProduct, any> = {
  id        : "",
  nama      : "Nama Produk",
  harga     : "Harga Produk",
  lokasi    : "Lokasi Produk",
  jumlah    : "Masukan Jumlah",
  jenis     : "Jenis Produk",
  img       : "Gambar Produk",
  keterangan: "Keterangan Produk"
}

export const defaultFormProduct: TProduct = {
  id        : "",
  nama      : "",
  harga     : 0,
  lokasi    : "",
  jumlah    : 0,
  jenis     : "",
  img       : jpgTextNotFound,
  keterangan: ""
}

