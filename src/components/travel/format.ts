import { TFromTravel } from '../../../entity/travel';

export const formTravel: Record<keyof TFromTravel, any> = {
  id: "1231",
  namaPengiriman: "Nama Produk",
  noHpPerusahaan: "Harga Produk",
  lokasi: "Lokasi Produk",
  jumlah: "Masukan Jumlah",
  jenis: "Jenis Produk",
  img: "Gambar Produk",
  keterangan: "Keterangan Produk"
}

export const defaultFormTravel: TFromTravel = {
  id: " ",
  namaPengiriman: " Tahu Baxo Bu Pudji ",
  noHpPerusahaan: ( 8123456789 ).toString(),
  lokasi: " Ungaran ",
  jumlah: 200_000,
  jenis: " Darat ",
  img: "img",
  keterangan: " Pedas "
}

