import { TFromTravel } from '@/entity/travel';

export const formTravel: Record<keyof TFromTravel, any> = {
  id: "1231",
  namaPengiriman: "Nama Travel",
  noHpPerusahaan: "No Hp Perusahan",
  lokasi: "Lokasi ",
  jenis: "Jenis Pengiriman",
  harga: "Kisaran Biaya Pengiriman",
  img: "Logo Travel",
  keterangan: "Keterangan "
}

export const defaultFormTravel: TFromTravel = {
  id: " ",
  namaPengiriman: " Tahu Baxo Bu Pudji ",
  noHpPerusahaan: ( 8123456789 ).toString(),
  lokasi: " Ungaran ",
  harga: 200_000,
  jenis: " Box ",
  img: "img",
  keterangan: "  "
}

