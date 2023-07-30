import type { TProduct } from '@/entity/client/produk';

export const formProduct: Record<keyof TProduct, any> = {
  id: "1231",
  nama: "Nama Produk",
  harga: "Harga Produk",
  lokasi: "Lokasi Produk",
  jumlah: "Masukan Jumlah",
  jenis: "Jenis Produk",
  img: "Gambar Produk",
  keterangan: "Keterangan Produk"
}

export const defaultFormProduct: TProduct = {
  id: " ",
  nama: " Tahu Baxo Bu Pudji ",
  harga: 20000,
  lokasi: " Ungaran ",
  jumlah: 0,
  jenis: " Orderan ",
  img: "img",
  keterangan: " Pedas "
}

