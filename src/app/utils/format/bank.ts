// noinspection JSUnusedGlobalSymbols

import { TPaymentDB } from "@/entity/Bank.model";

export const formBank: Record<keyof TPaymentDB, any> = {
  hp        : "No Telephone Perusahaan",
  nama      : "Nama Bank",
  no        : "No Rekening",
  id        : "123_bank",
  lokasi    : "Lokasi Bank",
  jenis     : "Jenis Bank",
  keterangan: "Keterangan",
  img       : "URL Gambar Logo perusahaan ",
  created_at: new Date(),
  updated_at: new Date(),
}

export const defaultFormBank: TPaymentDB = {
  hp        : "0987654321",
  nama      : "Mandiri",
  no        : "0987 12123 121 1312",
  id        : " ",
  lokasi    : "Ungaran",
  jenis     : "Kredit",
  keterangan: "Bisa Di cicil",
  img: "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
  created_at: new Date(),
  updated_at: new Date(),
}
// https://dummyimage.com/200x200/000/fff.jpg&text=not+found
