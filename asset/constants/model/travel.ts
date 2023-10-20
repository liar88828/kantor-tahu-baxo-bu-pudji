import { jpgTextNotFound } from '../data/images';

export const formTravel: Record<keyof TTravel, any> = {
  id  : "",
  nama: "Nama Travel",
  hp  : "No Hp perusahaan",
  lokasi    : "Lokasi ",
  jenis     : "Jenis Pengiriman",
  harga     : "Kisaran Biaya Pengiriman",
  img       : "Logo Travel",
  keterangan: "Keterangan "
}

export const defaultFormTravel: TTravel = {
  id        : "",
  nama  : "",
  hp        : "",
  lokasi: "",
  harga     : 0,
  jenis : "",
  img   : jpgTextNotFound,
  keterangan: ""
}

