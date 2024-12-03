import { currentMonth, currentYear, today } from '@/lib/utils/formatDate';

export type   TListCard = {
  id: string
  hpPenerima: string;
  penerima: string;
  alamatPenerima: string;
  //
  pesan: Date | string;
  waktuKirim: Date | string;
  pengirim: string;
  totalBayar: number;
  namaPengiriman: string;
  typePembayaran: string;
  status: string
  semuaProduct: TProduct[]
}
export const exampleTLIst: TListCard = {
  id            : "Kosong",
  hpPenerima    : "Kosong",
  penerima      : "Kosong",
  alamatPenerima: "Kosong",
  pesan         : `${ currentYear }-${ currentMonth }-${ today }`,
  // kirim         : `${ currentYear }-${ currentMonth }-${ today }`,
  waktuKirim    : `${ currentYear }-${ currentMonth }-${ today } 00:00:00.000`,
  pengirim      : "Kosong",
  totalBayar    : 0,
  namaPengiriman: "Kosong",
  typePembayaran: "Kosong",
  status        : "Kosong",
  semuaProduct  : [
    {
      id        : "Kosong",
      nama      : "Kosong",
      lokasi    : "Kosong",
      harga     : 0,
      jumlah    : 0,
      jenis     : "Kosong",
      keterangan: "Kosong",
      img       : "Kosong"
    }
  ]
}